const express = require('express');

const router = express.Router();

const apiController = require('../controller/apiController');

router.post("/send-message", apiController.index);

module.export = router

