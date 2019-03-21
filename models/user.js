const Joi = require('joi');
const SchemaModel = require('../config/schema');

const tableName = `user-details`;
const optionalKeys = ['verifiedornot','username'];
const userSchema = {
    hashKey: 'email',
    timestamps: true,
    schema: Joi.object({
        uid: Joi.string().alphanum(),
        username: Joi.string().alphanum(),
		email: Joi.string().email(),
		password: Joi.string().min(6),
        usertype: Joi.string(),
        verification_code: Joi.string(),
		verifiedornot: Joi.string(),
	}).optionalKeys(optionalKeys).unknown(true)
};
const User = SchemaModel(userSchema,{tableName:tableName});

module.exports = User;