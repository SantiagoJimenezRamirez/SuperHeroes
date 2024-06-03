"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//Problems with environment variables
const sequelize = new sequelize_1.Sequelize('heroes', 'root', 'Sjimenez1703', {
    host: 'localhost',
    dialect: "mysql"
});
exports.default = sequelize;
