const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    id: String,
    title: String,
    runtime: String,
    vote_average: String,
    vote_count: String,
    popularity: String,
    overview: String,
    keywords: [String],
    genres: [String],
    release_date: String,

});

module.exports = mongoose.model("movie", movieSchema);