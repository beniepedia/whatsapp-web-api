const express = require("express");
const router = express.Router();
const passport = require("passport");

const { body } = require("express-validator");

const authController = require("../controllers/authController");
const { Authenticated } = require("../config/auth");

router.get("/login", Authenticated, authController.index);
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
  passport.authenticate("local", {
    successRedirect: "/administrator/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  authController.login
);

router.delete("/logout", (req, res) => {
  req.logOut();
  return res.redirect("/auth/login");
});

module.exports = router;
