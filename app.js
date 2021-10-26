const fs = require('fs');
const express = require('express');
const { body, validationResult } = require('express-validator');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const socketIO = require("socket.io");
const http = require('http');
const ejs = require('ejs');

const { phoneNumberFormat } = require('./helpers/formatter.js');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use ejs engine
app.set('view engine', 'ejs');

let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
};

// Route to home
app.get('/', (req, res) => {
    res.render('index');
});



app.use(express.static(__dirname + '/views'));

// Use the saved values
const client = new Client({
    session: sessionData
});


client.on('message', message => {
    if (message.body === '!ping') {
        message.reply('pong');
    } else if (message.body === 'halo') {
        message.reply('iya halo juga');
    }
});


client.initialize();



// Socket io Connection
io.on('connection', function (socket) {
    socket.emit('message', 'Conecting to server. Please wait ...');
    socket.emit('status', 'Not Connected', 'warning');

    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        qrcode.toDataURL(qr, (err, url) => {
            socket.emit('qr', url);
            socket.emit('message', 'QR-Code Received, please scan ...');
        });
    });

    client.on('ready', () => {
        console.log('Client is ready!');
        socket.emit('message', 'Whatsapp is ready!');
        socket.emit('ready', 'Whatsapp is ready!');
        socket.emit('status', 'Connected!', 'success');
    });

    // Save session values to the file upon successful auth
    client.on('authenticated', (session) => {
        sessionData = session;
        socket.emit('authenticated', 'Whatsapp is authenticated!');
        socket.emit('status', 'Connected!', 'success');
        socket.emit('message', 'Authenticated!');

        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
            if (err) {
                console.error(err);
            }
        });
    });

});

// send message API
app.post('/api', [
    body('number').notEmpty(),
    body('message').notEmpty(),
], (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
        return msg;
    });

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: errors.mapped()
        });
    }

    const number = phoneNumberFormat(req.body.number);
    const message = req.body.message;

    client.sendMessage(number, message).then(response => {
        res.status(200).json({
            status: true,
            response: response
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            response: err
        });
    });


});

server.listen(port, function () {
    console.log("App running on port :" + port);
});