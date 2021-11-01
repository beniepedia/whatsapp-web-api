const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const apiController = require("../controllers/apiController");

router.post(
  "/send-message",
  [
    body("number").notEmpty().withMessage("Nomor HP tidak boleh kosong!"),
    body("number").isNumeric().withMessage("Nomor HP harus berupa angka!"),
    body("message")
      .notEmpty()
      .withMessage("Pesan whatsapp tidak boleh kosong!"),
  ],
  apiController.index
);

module.exports = router;
