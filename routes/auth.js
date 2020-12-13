const router = require('express').Router()
const User = require('../models/User')
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).json({ msg: error.details[0].message })
    }
    //Check if email already exists
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) {
        return res.status(409).json({
            msg: 'email already exists'
        })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.new_password, salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.status(200).json({
            msg: 'Successfully registered new user',
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
            }
        })
    } catch (error) {
        res.send(error)
    }

})

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.json({ msg: error.details[0].message })

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(401).json({
        msg: 'email is not valid'
    })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(401).json({
        msg: 'password is not valid'
    })

    //create and assign jwt
    const token = jwt.sign({ _id: user._id }, process.env.API_TOKEN)

    res.header('auth-token', token).status(200).json({
        msg: 'Successfully logged in',
        'auth-token': token,
        user: {
            id: user._id,
            name: user.name
        }
    })
})

module.exports = router