// const fs = require('fs');
const { Client } = require('whatsapp-web.js');

require('../config/db');
const deviceModel = require('../models/deviceModel');


const getSession = async () => {
  try {
    const session = await deviceModel.findOne();
    return session;
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  client: async () => {
    const dataSession = await getSession();
    return new Client({
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
      // session: dataSession.session 
    });
  }
}