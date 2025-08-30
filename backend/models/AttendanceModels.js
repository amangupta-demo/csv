import { Sequelize, DataTypes, Model  } from 'sequelize' ;
import sequelize from '../Database.js';
import User from './UserModels.js';

class Attendance extends Model{}
Attendance.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    UserId :{
        type:DataTypes.INTEGER,
        allowNull:false,
        // references:{
        //     model: 'Users',
        //     key:'employeeId'
        // }
    },
    date:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    punchIn:{
        type:DataTypes.TIME,
    },
    punchOut:{
        type:DataTypes.TIME,
    },
    work_hours: {
        type: DataTypes.STRING, // store as string "08:30:00"
        allowNull: true,
    },
    status:{
        type:DataTypes.STRING,
    }
},{
    sequelize,
    modelName: 'attendance',
    tableName: 'attendance',
    timestamps: true
})


// User.hasMany(Attendance,{foreignKey: 'UserId' })
// Attendance.belongsTo(User,{foreignKey: 'UserId'})
export default Attendance;