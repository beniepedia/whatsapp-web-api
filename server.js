const express = require('express');
const fs = require('fs');
const socketIO = require("socket.io");
var methodOverride = require("method-override")
const http = require('http');
const path = require('path');
const qrcode = require('qrcode');
const { Client } = require('whatsapp-web.js');

// whatsapp library

// WhatsApp Library
const client = require('./app/library/whatsapp-api');


// DB Conecttion
// require('./app/config/db');
// const deviceModel = require('./app/models/deviceModel');

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
// Route to API
const apiRouter = require("./app/routes/apiRouter");

app.use('/', homeRouter);
app.use('/api/send-message', apiRouter);

const SESSION_FILE_PATH = './app/library/session-whatsapp.json';


// Connection Socket

io.on('connection', async function(socket) {
    socket.emit('message', 'Conecting to server. Please wait ...');
    socket.emit('status', 'Not Connected', 'warning');

    client.on('qr', (qr) => {
        qrcode.toDataURL(qr, (err, url) => {
            io.emit('qr', url);
            socket.emit('message', 'QR-Code Received, please scan ...');
            console.log('QR-Code Received...');
        })
    });

    client.on('ready', () => {
        console.log('Client is ready!');
        socket.emit('message', 'Whatsapp is ready!');
        socket.emit('ready');
        socket.emit('status', 'Connected!', 'success');
    });

    client.on('authenticated', (session) => {
        sessionData = session;
        socket.emit('authenticated');
        socket.emit('status', 'Connected!', 'success');
        socket.emit('message', 'Authenticated!');
        socket.emit('message', 'Whatsapp is authenticated!');
    
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
            if (err) {
                console.error(err);
            }
        });
    });
});


server.listen(port, function () {
    console.log(`Server is ready http://localhost:${port}`);
});