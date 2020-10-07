const router = require('express').Router()
const verify = require('./verifyToken')
const User = require('../models/User')

router.get('/',verify, async (req, res) => {
    const {name, email, _id: id} = await User.findOne({_id: req.user._id})
    res.json({
        posts: {
            title: 'Secret Data'
        },
        user: {
            id,
            name,
            email,
        }
    })
})

module.exports = router