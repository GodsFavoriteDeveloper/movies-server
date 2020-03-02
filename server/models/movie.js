const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    plot: { type: String, required: true },
    year: { type: String, required: true },
    poster: { type: String, required: true },
    runtime: { type: String, required: true },
    genre: { type: String, required: true },
    creator: { type: String, required: true },
    createdDate: { type: Date, required: true }
})

module.exports = mongoose.model('Movie', movieSchema);
