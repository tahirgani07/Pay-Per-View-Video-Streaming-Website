const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    videos: {
        type: [{
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "video",
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