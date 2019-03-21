
const randomstring = require("randomstring");
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('../config/config');
const sendMail = require('../methods/email');
const date = require('date-and-time');

const mailgun = require('mailgun-js')({
	apiKey: config.API_KEY_MAILGUN,
	domain: config.MAILGUN_DOMAIN
});

module.exports.signup = function(req,res){

    console.log("\nSignup Api start\n");
        console.log(req.body); 
        const rootUrl = `${req.protocol}://${req.get('host')}`;
        var bodyParams = req.body;
        if(bodyParams.username && bodyParams.email && bodyParams.password && bodyParams.usertype){
            User.getItem({
                email: bodyParams.email
            }, {}, (err, user) => {
                if (err) {
                    console.log('err: ', err);
                    res.send({status:'failure',errorDescription:err});

                } else if (Object.keys(user).length === 0) {
                    // inserting data start from here
                    bcrypt.genSalt(10, function (err, salt) {
                        if (err) {
                            res.send({status: "failure", errorDescription: err});
                        } else {
                            bcrypt.hash(req.body.password, salt, function (err, hashpwd) {
                                if (err) {
                                    res.send({status:'failure',errorDescription:err});
                                } else {
                                    const datetime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'); 
                                    const verification_code = randomstring.generate();
                                    const uid = randomstring.generate({
                                        length: 24,
                                        charset: 'alphabetic'
                                    });
                                    const putParams = {
                                        "uid":uid,
                                        "email": bodyParams.email,
                                        "username": bodyParams.username,
                                        "password": hashpwd,
                                        "verification_code": verification_code,
                                        "verifiedornot": 'no',
                                        "usertype": bodyParams.usertype,
                                        "createdAt": datetime
                                    };
                                    console.log("Adding a new item...\n", putParams);

                                    User.createItem(putParams, {
                                        table: 'user-details'
                                    }, (err, user) => {
                                        if (err) {
                                            res.send({status:'error',errorDescription:err}); 
                                        } else {
                                            console.log('\nAdded user\n', user.email);
                                            const mailData = sendMail.sendVerificationMail(bodyParams.email, verification_code, rootUrl);
                                            mailgun.messages().send(mailData, (err, body) => {
                                                if (err) {
                                                    console.log('err: ', err);
                                                    res.send({status:'failure',errorDescription:err});
                                                } else {
                                                    console.log('Sent mail to your mailid successfully');
                                                    res.send({status:'success',messages:'Sent mail to your mailid successfully!'});
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });    // end here
                } else if (Object.keys(user).length > 0) {
                    res.send({status:'failure',errorDescription:'Emailid already registered!'});
                }
            });
    }else{
        res.send({status:'failure',errorDescription:'username/email/password/usertype canot be null'});
    }
};