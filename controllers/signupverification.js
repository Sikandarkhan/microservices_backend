const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('../config/config');

module.exports.signupverification = function(req,res){
    console.log("\n Signupverification  Api Started!!!");
    const queryParams = req.query;
    const email = queryParams.emailid;
    const verification_code = queryParams.token;
    if(email && verification_code){
        User.getItem({
            email: email
        }, {}, (err, user) => {
            if (err) {
                console.log('err: ', err);
                res.send({status:'failure',errorDescription:err});

            }else if(Object.keys(user).length > 0){
                if(user.verification_code === verification_code){
                    User.updateItem({
                        email:email,
                        verifiedornot:'yes'
                    },{},(err,user) => {
                        if(err){
                            console.log('err: ', err);
                            res.send({status:'failure',errorDescription:err});
                        }else{
                            res.send({stauts:'success',message:'email verified successfully!'});
                        }
                        

                    });
                }else{
                    console.log('err: ', err);
                    res.send({status:'failure',errorDescription:'Invalid verification code!'});
                }
                    
            }else if (Object.keys(user).length === 0) {
                res.send({status:'failure',errorDescription:'email not found!'});
            }
        });


    }else{
        res.send({status:'failure',errorDescription:' email/token canot be null!'});
    } 
};