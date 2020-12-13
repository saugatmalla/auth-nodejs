const { boolean } = require('@hapi/joi')
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
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
        type: boolean,
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

module.exports = mongose.model('Book', bookSchema)