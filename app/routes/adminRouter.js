const express = require("express");

const router = express.Router();

const { ensureAuthenticated } = require("../config/auth");

const dashboardController = require("../controllers/dashboardController");
const devicesController = require("../controllers/devicesController");

// Dashboard
router.get("/dashboard", ensureAuthenticated, dashboardController.index);

// Devices
router.get("/devices", ensureAuthenticated, devicesController.index);

module.exports = router;
