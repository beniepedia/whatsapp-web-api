"use strict";

const db = require("../config/db");
const Sequelize = require("sequelize");

let devices = db.define(
  "devices",
  {
    devId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    devName: {
      type: Sequelize.STRING,
      unique: true,
    },
    description: Sequelize.TEXT,
    devSession: Sequelize.JSONB,
    userId: Sequelize.STRING,
    phone: Sequelize.STRING,
    status: {
      type: Sequelize.ENUM,
      values: ["terputus", "terhubung"],
      defaultValue: "terputus",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

// devices.removeAttribute("id");

module.exports = devices;
