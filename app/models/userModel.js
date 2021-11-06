"use strict";

const db = require("../config/db");
const Sequelize = require("sequelize");

let users = db.define(
  "users",
  {
    uid: Sequelize.STRING,
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    password: Sequelize.STRING,
    isEmailVerified: Sequelize.BOOLEAN,
    isPhoneVerified: Sequelize.BOOLEAN,
    isBlocked: Sequelize.BOOLEAN,
    currentLogin: Sequelize.TIME,
    lastLogin: Sequelize.TIME,
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

users.removeAttribute("id");

module.exports = users;
