import { Sequelize } from "sequelize";

const SCHAME = process.env.DB_SCHAME;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;

const sequelize = new Sequelize(SCHAME, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
});

export default sequelize;
