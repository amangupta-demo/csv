import express from 'express'
import sequelize from './Database.js';
import cors from 'cors'

// const cors = require('cors');
const app = express()
const port = 3000;

app.use(express.json())
 app.use(cors({
   origin: 'http://localhost:5173',
   credentials:true,
   }));




import User from './models/UserModels.js'
import Attendance from './models/AttendanceModels.js'
import CsvSheet from './models/CsvSheetModels.js';

try {
  await sequelize.authenticate();  
  await sequelize.sync({ alter: true });
  // await sequelize.sync({force:true})
  console.log('Connection has been established successfully.'); 
} catch (error) {
  console.error('Unable to connect to the database:', error);  
}  

// import uplods from './middleware/uploadMiddleware.js';
import router from './router/uploadRoutes.js';

app.use('/' ,router)
  
// app.post('/upload',uplods.single('file'),((req,res)=>{
//   console.log('ehhbbbvh')
//   console.log(req.body)
//   console.log(req.file)
// }))


app.get('/',((req,res)=>{
    res.send("hello world ")
}))


app.listen(port,()=>{
    console.log('app is runing on 3000')
})