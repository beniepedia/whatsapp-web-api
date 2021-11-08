const controller = {};

controller.index = function (req, res) {
  res.render("home/dashboard", {
    title: "Halaman Dasboard",
    layout: "layout/main-layout",
    userLoginName: req.user.email,
  });
};

module.exports = controller;
