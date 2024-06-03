import { DataTypes } from "sequelize";
import sequelize from "../db/connection";


export const Heroe = sequelize.define("heroe", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING
    }
})