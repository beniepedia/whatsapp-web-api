const express = require("express");

const router = express.Router();

const { ensureAuthenticated } = require("../config/auth");

const homeController = require("../controllers/homeController");

router.get("/", ensureAuthenticated, homeController.index);

module.exports = router;
