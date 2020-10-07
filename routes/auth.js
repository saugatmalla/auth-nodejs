const router = require('express').Router()
const User = require('../models/User')
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body)
    if (error) {
        return res.send(error.details[0].message)
    }
    //Check if email already exists
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) {
        return res.status(409).json({
            msg: 'email already exists'
        })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.status(200).json({
            user_id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
        })
    } catch (error) {
        res.send(error)
    }

})

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.json({msg: error.details[0].message})

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(401).json({
        msg: 'email is not valid'
    })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(401).json({
        msg: 'password is not valid'
    })
    return res.status(200).json({
        msg: 'Success'
    })
})

module.exports = router