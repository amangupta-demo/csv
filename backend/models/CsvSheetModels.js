import { Model,DataTypes } from "sequelize";
import sequelize from "../Database.js";

class CsvSheet extends Model{};
CsvSheet.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    fileURL:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    sequelize,
    modelName:"CsvSheet",
    tableName:"CsvSheets",
    timestamps:true
})

export default CsvSheet
