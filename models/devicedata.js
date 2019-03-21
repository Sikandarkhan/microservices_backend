const Joi = require('joi');
const SchemaModel = require('../config/schema');

const optionalKeys = ['flag','patientid'];

const deviceDataSchema = {
    hashKey: 'deviceid',
    rangeKey: 'createdAt',
    timestamps: true,
    schema: Joi.object({
        patientid: Joi.string(),
        deviceid: Joi.string(),
        flag: Joi.number().positive().min(0),
        createdAt: Joi.string(),
    }).optionalKeys(optionalKeys).unknown(true)
};

const attToGet = ['patientid','deviceid', 'flag','createdAt'];
const attToQuery = ['patientid','deviceid', 'flag','createdAt'];

const optionsObj  = {
    attToGet,
    attToQuery,
    tableName:'device-data'
};

const DeviceData = SchemaModel(deviceDataSchema,optionsObj);

module.exports = DeviceData;