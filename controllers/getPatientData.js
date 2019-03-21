const patientData = require('../models/patientanddevice.js');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports.getDeviceData = function(req,res){
    console.log("\n PatientData  Api Started!!!");
    const bodyParams = req.body;
    const patientid= bodyParams.patientid;
    const token = bodyParams.token;
    console.log('bodyParams::',bodyParams);
    if(token && patientid){
        jwt.verify(token, config.SECRET_KEY, function(err, decode){
            if(err){
                res.status(500).send({status:"failure",message:"Invalid Token"});
            }else{
                console.log('type:::',typeof patientid);
                patientData.getItem({nurseid:decode.id,patientid:patientid},{},(err,data)=>{
                    if(err){
                        console.log("error while getting patient data:" + err);
                        res.send({
                            status: "error",
                            message: "Error while getting patient data"
                        }); 
                    }else{
                        res.send({
                            "status": "success",
                            message: "get devicedata success!",
                            data: data
                        });
                    }
                });
            }
        });
    }else{
        res.send({status:'failure',message:'token/deviceid canot be null!'});
    } 
};