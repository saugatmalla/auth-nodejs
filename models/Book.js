const { boolean } = require('@hapi/joi')
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Author'
    },
    genre: {
        type: String,
        required: true
    },
    published_on: {
        type: Date,
        required: true
    },
    released: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Book', bookSchema)