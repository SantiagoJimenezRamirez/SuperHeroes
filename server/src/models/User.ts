import { DataTypes } from "sequelize";
import sequelize from "../db/connection";


export const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    rol: {
        type: DataTypes.ENUM,
        values: ['User', 'Admin'],
        allowNull: false
    }
})