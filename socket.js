// WhatsApp API library
const client = require('./app/library/whatsapp-api');
const qrcode = require('qrcode');
const device = require('./app/models/deviceModel');

// Socket io Connection

// io.on('connection', function (socket) {
    // socket.emit('message', 'Conecting to server. Please wait ...');
    // socket.emit('status', 'Not Connected', 'warning');

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
    socket.emit('authenticated', 'Whatsapp is authenticated!');
    socket.emit('status', 'Connected!', 'success');
    socket.emit('message', 'Authenticated!');
    
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});


module.exports = client
// });