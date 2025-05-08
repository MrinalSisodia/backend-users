const mongoose = require("mongoose")

const BooksSchema = new mongoose.Schema({
title:{
    type: String, 
    required: true
}, author: {
    type: String, 
    required: true
},
publishedYear:{
    type: Number, 
    required: true
}, genre: [{
    type: String, 
    enum: ['Fiction', 'Non-fiction', 'Mystery', 'Thriller', 'Science Fiction', 'Fantasy', 'Romance', 'Historical', 'Autobiography', 'Business', 'Biography', 'Self-help', 'Other']
}], language: {
    type: String, 
    required: true
}, country: {
    type: String, 
},  rating: {
    type: Number, 
    min: 0, 
    max: 10,
    default: 0, 
}, summary: String, 
coverImageUrl: String, 
}, {timestamps: true},
)

const Books = mongoose.model("Books", BooksSchema)

module.exports = Books