//Validation
const Joi = require('@hapi/joi');


//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required().label('Name'),
        email: Joi.string().min(6).required().email().label('Email'),
        new_password: Joi.string().min(6).required().label('New password'),
        confirm_password: Joi.any().equal(Joi.ref('new_password'))
            .required()
            .label('Confirm password')
            .options({ messages: { 'any.only': '{{#label}} does not match' } })
    })
    return schema.validate(data);
}

//Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

const authorValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required().min(2).max(150)
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.authorValidation = authorValidation;