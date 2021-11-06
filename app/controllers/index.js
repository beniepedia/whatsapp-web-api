const home = require("./homeController");
const dashboard = require("./dashboardController");
const auth = require("./authController");
const devices = require("./devicesController");
const api = require("./apiController");

const controller = {};

controller.home = home;
controller.dashboard = dashboard;
controller.auth = auth;
controller.devices = devices;
controller.api = api;

module.exports = controller;
