const deviceModel = require("../models/deviceModel");

const getDevice = async () => {
  return deviceModel.find();
};

module.exports = {
  index: async function (req, res) {
    const data = await getDevice();
    console.log(data);
    res.render("home/devices", {
      title: "Halaman Perangkat",
      layout: "layout/main-layout",
    });
  },
};
