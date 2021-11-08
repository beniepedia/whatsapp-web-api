const deviceModel = require("../models/deviceModel");

const controller = {};

controller.index = async function (req, res) {
  const devices = await deviceModel.findAll({
    where: {
      userId: req.user.uid,
    },
  });

  res.render("home/devices", {
    title: "Halaman Perangkat",
    layout: "layout/main-layout",
    userLoginName: req.user.email,
    devices: devices,
  });
};

controller.create = async function (req, res) {
  try {
    await deviceModel.create({
      devName: req.body.devicename,
      phone: req.body.phone,
      description: req.body.description,
      userId: req.user.uid,
    });
    return res.status(200).json({
      status: true,
      message: "Data berhasil ditambah",
    });
  } catch {
    console.log("error");
  }
};

controller.delete = function (req, res) {
  const id = req.body.id;

  deviceModel
    .destroy({
      where: {
        devId: id,
      },
    })
    .then((rowDelete) => {
      if (rowDelete === 1) {
        return res.status(200).json({
          status: true,
          message: "Delete sukses",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = controller;
