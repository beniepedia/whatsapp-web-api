const mongoose = require('mongoose');
const device = mongoose.model('Device', {
    session: String,
    insertAt: Date
});

module.exports = device