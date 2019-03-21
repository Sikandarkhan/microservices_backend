const Device = require('../models/device.js');
const Patinet = require('../models/patientanddevice.js');
const moment = require('moment-timezone');
const config = require('../config/config');
const randomstring = require("randomstring");

const jwt = require('jsonwebtoken');
module.exports.addDevice = function(req,res){
    console.log("\n addDevice  Api Started!!!");
    const bodyParams = req.body;
    console.log("bodyParams::",bodyParams);
    const token = bodyParams.token;
    const deviceid = bodyParams.deviceid;
    console.log('suma::',typeof bodyParams.patientData);
    const patientData = (typeof bodyParams.patientData === 'string')?JSON.parse(bodyParams.patientData):bodyParams.patientData;
    console.log("patientdata::",patientData);
    if(token && deviceid && patientData){
        jwt.verify(token, config.SECRET_KEY, function(err, decode){
            if(err){
                res.status(500).send({status:"failure",message:"Invalid Token"});
            }else{
                Device.getItem({
                    deviceid : deviceid
                }, {}, (err, device) => {
                    if (err) {
                        console.log('err: ', err);
                        res.send({status:'failure',errorDescription:err});
        
                    } else if (Object.keys(device).length === 0) {
                        const datetime = moment(Date.now()).tz('Asia/Kolkata').format('YYYY-MM-DD HH:MM'); 
                        const date = moment(Date.now()).tz('Asia/Kolkata').format('YYYY-MM-DD HH:MM:SS');
                        console.log("datetime::",datetime);
                        const uid = randomstring.generate({
                            length: 24,
                            charset: 'alphabetic'
                        });
                        const patient_data = {
                            deviceid:deviceid,
                            nurseid: decode.id,
                            patientid: uid,
                            name: patientData.name,
                            age: patientData.age,
                            address: patientData.address,
                            createdAt: datetime,
                            bednumber:patientData.bednumber,
                            joinedAt:date,
                            lastseen: date,
                            count: 0
                        };
                        Patinet.createItem(patient_data,{table:'patient-device-details'},
                        (err,patient)=>{
                            if (err) {
                                console.log('err: ', err);
                                res.send({status:'failure',errorDescription:err});
                
                            }else{
                                
                                const deviceData = {
                                    deviceid: deviceid,
                                    patientid: patient_data.patientid,
                                    nurseid: decode.id,
                                    createdAt: datetime
                                    
                                };
                                Device.createItem(deviceData,{table: 'device-pairing'},    
                                (err,device)=>{
                                    if(err){
                                        console.log('err: ', err);
                                        res.send({status:'failure',errorDescription:err});
                                    }else{
                                        console.log("data:::",device);
                                        res.send({status:'success',message: 'device added successfully!'});
                                        
                                    }
                                    
                                });
                            }
                        });
                        
                    }else{
                        res.send({status:'failure',errorDescription: 'device already added'});
                    }
                });
            }
        });
    }else{
        res.send({status:'failure',errorDescription:' token/deviceid/patientData canot be null!'});
    } 
};