const router = require('express').Router()
const Author = require('../models/Author.js')
const { authorValidation } = require('../validation')

router.post('/register', async (req, res) => {
    const { error } = authorValidation(req.body)
    if (error) {
        return res.status(400).json({ msg: error.details[0].message })
    }

    console.log(req.body)

    const author = new Author({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const savedAuthor = await author.save()


        res.status(200).json({
            msg: 'Successfully author registered',
            payload: {
                id: savedAuthor._id,
                name: savedAuthor.name,
                age: savedAuthor.age,
                created_at: savedAuthor.created_at,
                updated_at: savedAuthor.updated_at
            }
        })
    } catch(error) {
        res.status(500).json({
            msg: 'internal error'
        })
    }
})

module.exports = router