const express = require('express');

const router = express.Router();

const apiController = require('../controller/apiController');

router.post("/api/send-message", apiController.index);

module.exports = router

