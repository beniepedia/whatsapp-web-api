const deviceModel = require("../models/deviceModel");

const controller = {};

controller.index = function (req, res) {
  res.render("home/devices", {
    title: "Halaman Perangkat",
    layout: "layout/main-layout",
  });
};

module.exports = controller;
