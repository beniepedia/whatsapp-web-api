const express = require('express');
const socketIO = require("socket.io");
var methodOverride = require("method-override")
const http = require('http');
const ejs = require('ejs');
const path = require('path');
const qrcode = require('qrcode');

// WhatsApp Library
const client = require('./app/library/whatsapp-api');

// DB Conecttion
require('./app/config/db');
const deviceModel = require('./app/models/deviceModel');

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

app.use('/', homeRouter);

// client.on('qr', (qr) => {
//     // qrcode.toDataURL(qr, (err, url) => {
//     //     io.emit('qr', url);
//     //     socket.emit('message', 'QR-Code Received, please scan ...');
//     //     console.log('QR-Code Received...');
//     // })
//     console.log(qr);
// });

// Connection Socket
io.on('connection', function(socket) {
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

    client.on('authenticated', async (session) => {
        socket.emit('authenticated', 'Whatsapp is authenticated!');
        socket.emit('status', 'Connected!', 'success');
        socket.emit('message', 'Authenticated!');
    
        await deviceModel.insertMany({
            session: JSON.stringify(session),
            insertAt: new Date()
        })
    });
});


server.listen(port, function () {
    console.log(`Server is ready http://localhost:${port}`);
});