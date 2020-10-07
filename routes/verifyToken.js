const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({msg: 'Acess denied. Auth token required'})

    try {
        const verified = jwt.verify(token, process.env.API_TOKEN)
        req.user = verified
        next()
    }
    catch(error) {
        return res.status(400).json({msg: 'Invalid token'})
    }
}