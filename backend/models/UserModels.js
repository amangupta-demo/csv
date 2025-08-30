import { Sequelize, DataTypes, Model  } from 'sequelize' ;
import sequelize from '../Database.js';
class User extends Model{} // creating class 

User.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    designation:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    teamName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:'User'
    },
    employeeId:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false
    }

},{
    sequelize,
    modelName:'User',
    tableName:"Users",
    timestamps:true
})

export default User