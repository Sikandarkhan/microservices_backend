const PatinetandDevice = require('../models/patientanddevice.js');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports.getPatientList = function(req,res){
    console.log("\n PatientList  Api Started!!!");
    const bodyParams = req.body;
    const token = bodyParams.token;
    if(token){
        jwt.verify(token, config.SECRET_KEY, function(err, decode){
            if(err){
                res.status(500).send({status:"failure",message:"Invalid Token"});
            }else{
                console.log("type::: of id", typeof(decode.id));
                PatinetandDevice.query(decode.id).then((patients) => {
                    res.send({
                        "status": "success",
                        message: "get patientList success!",
                        patients: patients
                    });
                }).catch((err) => {
                    console.log("error while getting all patients::" + err);
                    res.send({
                        status: "error",
                        message: "Error while getting all patients"
                    });
                });

            }
        });
    }else{
        res.send({status:'failure',message:'token canot be null!'});
    } 
};