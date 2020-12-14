const router = require('express').Router()
const Book = require('../models/Book')
const Author = require('../models/Author')
const { bookValidation } = require('../validation')

router.post('/register', async (req, res) => {
    const { error } = bookValidation(req.body)
    if (error) {
        return res.status(400).json({ msg: error.details[0].message })
    }

    const author = await Author.findOne({ _id: req.body.author })
    if (!author) {
        return res.status(404).json({ msg: 'Author not found' })
    }

    const book = new Book({
        name: req.body.name,
        genre: req.body.genre,
        author: author._id,
        published_on: req.body.published_on
    })

    try {
        const savedBook = await book.save()

        res.status(200).json({
            msg: 'Successfully registered',
            payload: {
                name: savedBook.name,
                author: author.name,
                genre: savedBook.genre,
                published_on: savedBook.published_on,
                realeased: savedBook.released,
                created_at: savedBook.created_at,
                updated_at: savedBook.updated_at,
            }
        })
    } catch (error) {
        res.status(500).json({ error, msg: 'error' })
    }
})

module.exports = router