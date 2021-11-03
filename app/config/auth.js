module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "please login to view this resource");
    res.redirect("/auth/login");
  },

  Authenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/administrator/dashboard");
    }

    next();
  },
};
