const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')

//Routes
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
const authorsRoute = require('./routes/authors')
const booksRoute = require('./routes/books')

//connect to db
mongoose.connect(process.env.MONGODB,
    { useNewUrlParser: true, useUnifiedTopology: true }, function () {
        console.log('connected to db')
    })
    
//Middlewares
app.use(express.json())

//route middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postsRoute)
app.use('/api/author', authorsRoute)
app.use('/api/book', booksRoute)


app.listen(3000, () => {
    console.log('server running in port 3000')
})
