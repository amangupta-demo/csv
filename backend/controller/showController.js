// import CsvSheet from "../models/CsvSheetModels.js";
import Attendance from "../models/AttendanceModels.js";
 const showController = async (req,res) =>{

let user = await Attendance.findAll()
    // console.log(user)
    res.status(200).json(user)
}

export default showController;  