const express = require('express');

const app = express();

//Routes
const authRoute = require('./routes/auth');

app.use('/api/user', authRoute);

app.listen(3000, () => {
    console.log('server running in port 3000')
})
