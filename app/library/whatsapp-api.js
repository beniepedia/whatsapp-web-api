const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
};

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

client.on('qr', (qr) => {
    console.log('QR-Code Receiced...!!!', qr);
    // qrcode.toDataURL(qr, (err, url) => {
    //     socket.emit('qr', url);
    //     socket.emit('message', 'QR-Code Received, please scan ...');
    // });
});


module.exports = client;