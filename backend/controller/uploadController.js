import cloudinary from "../config/cloudinaryConfig.js"
import fs from 'fs'
import CsvSheet from "../models/CsvSheetModels.js"
 import csv from "csv-parser";
 import Attendance from "../models/AttendanceModels.js";
import { log } from "console";


// export const uploadAttendance = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }}catch(error){
//         console.log(error)
//     }

// }

export const uploadController = async (req, res) => {
    try {  

        if (!req.file) {
            return res.status(400).json({ Error: "No file uploaded" });
        }

        // console.log(req.file.path)
        let result = await cloudinary.uploader.upload(req.file.path, {
            folder: "documents", // optional folder name in cloudinary
            resource_type: "auto"
        })

        // console.log(result)
        const sheetDB =  await CsvSheet.create({
            fileURL:result.secure_url
        })
        // console.log(sheetDB)

       let records = [];

fs.createReadStream(req.file.path)
  .pipe(csv({ separator: "\t", headers: false }))
  .on("data",  (row) => {
    // console.log(row); // each row from CSV

    //                                                                                              .log('hello 1')
     const emp_id = row[0];
        const timestamp = row[1];
        if (emp_id && timestamp) {
          const [date, time] = timestamp.split(" ");
          records.push({ emp_id, date, time });
        }

// console.log('hello 2')

  })
  .on("end", async () => {
    console.log("File processed!");
  

    const grouped = {};
        records.forEach((rec) => {
          const key = `${rec.emp_id}--${rec.date}`;
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(rec.time);

        //   console.log(grouped)
    // console.log(records)

  });

//   console.log(grouped)



  // 3. Build attendance records
        const finalData = [];
        for (let key in grouped) {
          const [emp_id, date] = key.split("--");
          const punches = grouped[key].sort(); // sort times
          const punch_in = punches[0];
          const punch_out = punches[punches.length - 1];

// console.log(key)
// console.log(grouped[key])
        //   console.log('emp_id  :',emp_id,' date :',date,' punches :',punches,' punch_in :',punch_in,' punch_out :',punch_out,) 


          // calculate work hours
          let work_hours = null;
          let status = "Present";
          if (punch_in && punch_out) {
            const start = new Date(`1970-01-01T${punch_in}Z`);
            const end = new Date(`1970-01-01T${punch_out}Z`);
            const diff = (end - start) / 1000; // seconds
            const hrs = String(Math.floor(diff / 3600)).padStart(2, "0");
            const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
            const secs = String(diff % 60).padStart(2, "0");
            work_hours = `${hrs}:${mins}:${secs}`;
          } else {
            status = "Incomplete";
          }
// console.log(work_hours)
          finalData.push({
            emp_id,
            date,
            punch_in,
            punch_out,
            work_hours,
            status,

          });
        }

         for (let rec of finalData) {
          const exists = await Attendance.findOne({where:{'UserId':rec.emp_id , 'date':rec.date}})

          if(!exists){
            let data=  await Attendance.create({
                'UserId':rec.emp_id ,
                'date':rec.date,
                'punchIn':rec.punch_in,
                'punchOut':rec.punch_out,
                'work_hours':rec.work_hours,
                'status':rec.status,
            })
            // console.log(data)
          }


                }

fs.unlinkSync(req.file.path)

res.status(200).json({
          message: "Attendance sheet uploaded successfully",
          inserted: finalData.length,
        });
  })

    } catch (error) {
        fs.unlinkSync(req.file.path)
        console.log(error)
    }
}




