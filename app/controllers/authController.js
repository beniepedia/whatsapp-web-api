const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = 10;
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports = {
  index: function (req, res) {
    res.render("auth/login", {
      title: "Halaman Login",
      layout: "main-login-layout",
    });
  },

  login: async function (req, res) {
    const errors = validationResult(req).formatWith(({ msg }) => {
      return msg;
    });

    if (!errors.isEmpty()) {
      return res.status(200).json({
        status: false,
        errorType: "danger",
        message: errors.mapped(),
      });
    }

    const passwordHash = await hashPassword(req.body.password);

    const data = await new userModel({
      name: "Ahmad Qomaini",
      email: req.body.email,
      password: passwordHash,
    });

    data
      .save()
      .then(() => {
        res.status(200).json({
          status: true,
          message: "Data berhasil disimpan",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
