const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config')

//Routes
const authRoute = require('./routes/auth');

//connect to db
mongoose.connect(process.env.MONGODB,
    { useNewUrlParser: true, useUnifiedTopology: true }, function () {
        console.log('connected to db')
    })
    
//Middlewares
app.use(express.json())

//route middlewares
app.use('/api/user', authRoute);


app.listen(3000, () => {
    console.log('server running in port 3000')
})
