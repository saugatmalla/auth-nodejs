const router = require('express').Router()
// const Book = require('../models/Book')

router.post('/register', (req,res) => {
    res.status(200).json({
        msg: 'Successfully registered'
    })
})

module.exports = router