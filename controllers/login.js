const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports.login = function(req,res){
    console.log("\n Login Api Started!!!");
    const bodyParams = req.body;
    const email = bodyParams.email;
    const password = bodyParams.password;
    const usertype = bodyParams.usertype;
    if(email && password){
        User.getItem({
            email: bodyParams.email
        }, {}, (err, user) => {
            if (err) {
                console.log('err: ', err);
                res.send({status:'failure',errorDescription:err});

            } else if (Object.keys(user).length === 0) {
                res.send({status:'failure',errorDescription:'email not found!'});
            }else {
                console.log('user:::',user);
                if(user.verifiedornot === 'yes'){
                    var hashpwd = user.password;
                    bcrypt.compare(password, hashpwd, function (err, result) {
                        if (err) {
                            res.send({ status: "error", errorDescription: err });
                        }else if (result) {
                            var token = jwt.sign({ email: req.body.email,usertype: user.usertype,id :user.uid ,expiresIn: '24h' }, config.SECRET_KEY);
                            res.send({status:'success', message:'loggedin successfully!',token:token});
                        }
                    });
                }else{
                    res.send({ status:"failure", errorDescription:'email not verified!'});
                }
            }
        });


    }else{
        res.send({status:'failure',errorDescription:' email/password canot be null!'});
    } 
};