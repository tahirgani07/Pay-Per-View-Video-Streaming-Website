const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    movies: {
        type: [{
            type: String,
            required: true,
            ref: "movie",
        }],
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    }
});

module.exports = mongoose.model("genre", genreSchema);