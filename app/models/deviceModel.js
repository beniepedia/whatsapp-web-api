
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

const data = new device({
    session: "sadasdasd",
    insertAt: Date.now()
})

module.exports = device
