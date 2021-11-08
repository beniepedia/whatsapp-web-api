const express = require("express");

const router = express.Router();

const { ensureAuthenticated } = require("../config/auth");

const dashboardController = require("../controllers/dashboardController");
const devicesController = require("../controllers/devicesController");
const devices = require("../models/deviceModel");

// Dashboard
router.get("/dashboard", ensureAuthenticated, dashboardController.index);

// Devices
router.get("/devices", ensureAuthenticated, devicesController.index);
router.post("/devices", ensureAuthenticated, devicesController.create);
router.delete("/devices/", ensureAuthenticated, devicesController.delete);

module.exports = router;
