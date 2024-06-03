import { Sequelize } from "sequelize";

//Problems with environment variables
const sequelize = new Sequelize('heroes', 'root', 'Sjimenez1703', {
    host: 'localhost',
    dialect: "mysql"
});

export default sequelize;