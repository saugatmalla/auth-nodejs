const router = require('express').Router();
const User = require('../models/User');

//Validation

const Joi = require('@hapi/joi');

const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
})

router.post('/register', async (req, res) => {

    const {error} = schema.validate(req.body);
    if(error) {
        return res.send(error.details[0].message)
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = await user.save()
        res.send(savedUser)
        console.log(savedUser)
    } catch (error) {
        res.send(error)
    }

})

router.post('/login', (req, res) => {
    res.send('login')
})

module.exports = router;