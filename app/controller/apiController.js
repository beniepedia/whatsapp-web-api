

const { body, validationResult } = require('express-validator');
const { phoneNumberFormat } = require('./helpers/formatter.js');

module.exports = {
    index: function(req, res) {
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
    }
}