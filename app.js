const express = require("express");
const app = express();
const cors = require('cors');

const logger = require('morgan');
const bodyParser = require('body-parser');



// middlewares
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));
app.use(bodyParser.json({limit: '50mb'}));

//controllers
const signupControllers = require('./controllers/signup.js');
const loginCOntrollers = require('./controllers/login.js');
const signupVerification = require('./controllers/signupverification.js');
const addDeviceControllers = require('./controllers/addDevice.js');
const getpatientListControllers = require('./controllers/getPatientlist.js');
const deviceData = require('./controllers/getDevicedata.js');
const patientdata = require('./controllers/getPatientData.js');
const endPoint = require('./controllers/create-end-point.js');


app.post('/signup', signupControllers.signup);
app.post('/login',loginCOntrollers.login);
app.get('/activateaccount', signupVerification.signupverification);
app.post('/scan-device',addDeviceControllers.addDevice);
app.post('/get-devices',getpatientListControllers.getPatientList);
app.post('/get-device-data',deviceData.getDeviceData);
app.post('/get-patient-data',patientdata.getDeviceData);

app.get('/get-end-point',endPoint.endPoint);

app.listen(2019, function(){
    console.log(`server is running on port 2019`);
});
