const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const { hash } = require('../helpers/password');

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

    // const compare = await match(req.body.password, '$2b$10$lTtCqmYtg.I64oyY32dRj.H/wkM1LeZKsRfZBLT/ydJo6pT3alfyC');

    // console.log(compare)

    try {
      req.body.password = await hash(req.body.password);

      const user = new userModel(req.body);

      await user.save();
    } catch(err) {
      console.log(err);
    }

    // const data = await new userModel({
    //   name: "Ahmad Qomaini",
    //   email: req.body.email,
    //   password: passwordHash,
    // });

    // data
    //   .save()
    //   .then(() => {
    //     res.status(200).json({
    //       status: true,
    //       message: "Data berhasil disimpan",
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
};
