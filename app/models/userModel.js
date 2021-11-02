require("../config/db");
const mongoose = require('mongoose');

const user = mongoose.model('User', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
});

module.exports = user
