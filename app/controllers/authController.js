const userModel = require('../models/userModel');

module.exports = {
    index: function(req, res) {
        res.render('auth/login')
    },

    login: async function(req, res){
       const data = await new userModel({
           name: "Ahmadddd",
           email: req.body.email,
           password: req.body.password,
       });

       data.save().then(() => { 
           res.status(200).json({
                status: true,
                message: "Data berhasil disimpan"
           });
        }).catch(err => { console.log(err) });
    }
}