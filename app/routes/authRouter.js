const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const authController = require("../controllers/authController");

router.get("/login", authController.index);
router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email tidak boleh kosong!")
      .isEmail()
      .withMessage("Format email tidak sesuai"),
    body("password").notEmpty().withMessage("Password tidak boleh kosong!"),
  ],
  authController.login
);

module.exports = router;
