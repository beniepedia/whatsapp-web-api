const express = require('express');
const socketIO = require("socket.io");
var methodOverride = require("method-override")
const http = require('http');
const ejs = require('ejs');
const path = require('path');

const Client = require('./app/library/whatsapp-api');


// Create Server
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

// use ejs engine
app.set("views", path.join(__dirname, "app/views"));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));


// Route to home
const homeRouter = require("./app/routes/homeRouter");
const client = require('./app/library/whatsapp-api');
app.use('/', homeRouter);


// QR Code Received
client;


server.listen(port, function () {
    console.log("App running on port :" + port);
});