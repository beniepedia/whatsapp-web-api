const fs = require('fs');
const { Client } = require('whatsapp-web.js');

// // Path where the session data will be stored
const SESSION_FILE_PATH = './session-whatsapp.json';

let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
};

console.log(sessionData);
// Use the saved values
const client = new Client({
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu'
    ]}, 
    session: sessionData
  });
  
client.initialize();

// client.on('message', message => {
//     if (message.body === '!ping') {
//         message.reply('pong');
//     } else if (message.body === 'halo') {
//         message.reply('iya halo juga');
//     }
// });



module.exports = client;