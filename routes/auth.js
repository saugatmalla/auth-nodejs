const router = require('express').Router();
const mongoose = require('mongoose');
require('dotenv/config')

//connect to db
mongoose.connect(process.env.MONGODB,
    {useNewUrlParser: true, useUnifiedTopology: true}, function() {
        console.log('connected to db')
    })

router.post('/register', (req, res) => {
    res.send('register')
})

router.post('/login', (req, res) => {
    res.send('login')
})

module.exports = router;