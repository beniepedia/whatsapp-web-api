const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((res) => {
    console.log("Database connect succesfully");
  })
  .catch((err) => {
    console.log(err);
    return false;
  });
