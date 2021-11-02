require("./app/config/db");
const mongoose = require('mongoose');
const device = mongoose.model('Device', {
    session: {
        type: String,
        required: true,
    },
    insertAt: {
        type: Date,
        required: true,
    }
});

module.exports = device
