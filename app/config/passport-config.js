const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

function initialize(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      userModel
        .findOne({
          where: {
            email: email,
          },
        })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          bcrypt.compare(password, user.password, (err, isMacth) => {
            if (err) throw err;
            if (isMacth) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorect" });
            }
          });
          if (user.isBlocked) {
            return done(null, false, { message: "Akun anda diblock" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
  passport.serializeUser((user, done) => done(null, user.uid));
  passport.deserializeUser((uid, done) => {
    // user.findById(id, function (err, user) {
    //   console.log(user);
    // });
    userModel
      .findOne({
        where: {
          uid: uid,
        },
      })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(null, false);
      });
  });
}

module.exports = initialize;
