const Sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const env = process.env;

let db = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  dialect: "postgres",
  host: env.DB_HOST,
  logging: false,
});

module.exports = db;
