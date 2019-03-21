const deviceData = require('../models/devicedata.js');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports.getDeviceData = function(req,res){
    console.log("\n PatientList  Api Started!!!");
    const bodyParams = req.body;
    const deviceid = bodyParams.deviceid;
    const token = bodyParams.token;
    if(token && deviceid){
        jwt.verify(token, config.SECRET_KEY, function(err, decode){
            if(err){
                res.status(500).send({status:"failure",message:"Invalid Token"});
            }else{
                
                deviceData .query(deviceid).then((data) => {
                    res.send({
                        "status": "success",
                        message: "get devicedata success!",
                        data: data
                    });
                }).catch((err) => {
                    console.log("error while getting devicedata::" + err);
                    res.send({
                        status: "error",
                        message: "Error while getting devicedata"
                    });
                });

            }
        });
    }else{
        res.send({status:'failure',message:'token/deviceid canot be null!'});
    } 
};