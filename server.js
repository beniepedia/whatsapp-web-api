const express = require("express");
const fs = require("fs");
const socketIO = require("socket.io");
var methodOverride = require("method-override");
const http = require("http");
const path = require("path");
const qrcode = require("qrcode");
const axios = require("axios");
const dev = require("./app/library/whatsapp-api.js");
const { body, validationResult } = require("express-validator");
const { phoneNumberFormat } = require("./app/helpers/formatter.js");
const { MessageMedia } = require("whatsapp-web.js");

// MongoDB
require("./app/config/db");
const deviceModel = require("./app/models/deviceModel");

// Create Server
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// use ejs engine
app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

// Route to home
const homeRouter = require("./app/routes/homeRouter");
// Route to API
const apiRouter = require("./app/routes/apiRouter");

app.use("/", homeRouter);

// Server
(async () => {
  const client = await dev.client();
  client.initialize();

  server.listen(port, function () {
    console.log(`Server is ready http://localhost:${port}`);
  });

  // Connection Socket
  io.on("connection", function (socket) {
    socket.emit("message", "Conecting to server. Please wait ...");
    socket.emit("status", "Not Connected", "warning");

    client.on("qr", (qr) => {
      qrcode.toDataURL(qr, (err, url) => {
        io.emit("qr", url);
        socket.emit("message", "QR-Code Received, please scan ...");
        console.log("QR-Code Received...");
      });
    });

    client.on("ready", () => {
      console.log("Client is ready!");
      socket.emit("message", "Whatsapp is ready!");
      socket.emit("ready");
      socket.emit("status", "Connected!", "success");
    });

    client.on("authenticated", (session) => {
      socket.emit("authenticated");
      socket.emit("status", "Connected!", "success");
      socket.emit("message", "Whatsapp is authenticated!");

      deviceModel.findOne().then((res) => {
        if (res == null) {
          const data = new deviceModel({
            session: JSON.stringify(session),
            insertAt: Date.now(),
          });

          data.save().then(() => {
            console.log("Session inserted");
          });
        }
      });
    });

    client.on("auth_failur", (session) => {
      socket.emit("message", "Auth failur, restarting...");
    });

    client.on("disconnected", (reason) => {
      deviceModel.deleteMany().then(() => {
        console.log("Session deleted...");
      });
      socket.emit("message", "Whatsapp is disconnected...");
      client.destroy();
      client.initialize();
    });
  });

  //   APi Connection
  app.post(
    "/api/send-message",
    [
      body("number").notEmpty().withMessage("Nomor HP tidak boleh kosong!"),
      body("number").isNumeric().withMessage("Nomor HP harus berupa angka!"),
      body("message")
        .notEmpty()
        .withMessage("Pesan whatsapp tidak boleh kosong!"),
    ],
    (req, res) => {
      const errors = validationResult(req).formatWith(({ msg }) => {
        return msg;
      });

      if (!errors.isEmpty()) {
        return res.status(422).json({
          status: false,
          message: errors.mapped(),
        });
      }

      const number = phoneNumberFormat(req.body.number);
      const message = req.body.message;

      client
        .sendMessage(number, message)
        .then((response) => {
          res.status(200).json({
            status: true,
            response: response,
          });
        })
        .catch((err) => {
          res.status(500).json({
            status: false,
            response: err,
          });
        });
    }
  );

  app.post(
    "/api/send-media-url",
    [
      body("number").notEmpty().withMessage("Nomor HP tidak boleh kosong!"),
      body("number").isNumeric().withMessage("Nomor HP harus berupa angka!"),
      body("url")
        .notEmpty()
        .withMessage("Tentukan url gambar / File yang akan dikirim!"),
    ],
    async (req, res) => {
      const errors = validationResult(req).formatWith(({ msg }) => {
        return msg;
      });

      if (!errors.isEmpty()) {
        return res.status(422).json({
          status: false,
          message: errors.mapped(),
        });
      }

      const number = phoneNumberFormat(req.body.number);
      const caption = req.body.caption;
      const url = req.body.url;

      let mimetype;
      const attachment = await axios
        .get(url, { responseType: "arraybuffer" })
        .then((respon) => {
          mimetype = respon.headers["content-type"];
          return respon.data.toString("base64");
        });

      // create media

      const Media = new MessageMedia(mimetype, attachment, "Media");

      client
        .sendMessage(number, Media, { caption: caption })
        .then((response) => {
          res.status(200).json({
            status: true,
            response: response,
          });
        })
        .catch((err) => {
          res.status(500).json({
            status: false,
            response: err,
          });
        });
    }
  );

  //   Chat Auto replay
  client.on("message", async (message) => {
    let chat = await message.getChat();
    //console.log(chat);
    chat.sendSeen();

    if (message.body === "!ping") {
      message.reply("pong");
    }

    if (chat.isGroup) {
      let grpid = chat.id._serialized;
      console.log("Group ID: " + grpid);
    }
  });
})();
