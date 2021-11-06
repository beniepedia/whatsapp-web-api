// const userModel = require("../models/userModel");
// const { validationResult } = require("express-validator");
// const { hash } = require("../helpers/password");

// module.exports = {
//   index: function (req, res) {
//     res.render("auth/login", {
//       title: "Halaman Login",
//       layout: "main-login-layout",
//     });
//   },

//   login: async function (req, res) {
//     const errors = validationResult(req).formatWith(({ msg }) => {
//       return msg;
//     });

//     if (!errors.isEmpty()) {
//       return res.status(200).json({
//         status: false,
//         errorType: "danger",
//         message: errors.mapped(),
//       });
//     }
//   },
// };

const controller = {};

controller.index = function (req, res) {
  res.render("auth/login", {
    title: "Halaman Login",
    layout: "main-login-layout",
  });
};

module.exports = controller;
