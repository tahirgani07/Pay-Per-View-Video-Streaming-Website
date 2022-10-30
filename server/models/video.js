const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    tags: {
        type: [{
            type: String,
            required: true,
        }],
    },
    rating: {
        type: Number,
        default: 0,
    },
    thumbnailUrl: {
        type: String,
        default: "test-thumbnail.jpg",
    },
    posterUrl: {
        type: String,
        default: "test-poster.jpg",
    },
    videoUrl: {
        type: String,
        default: "test-video.mp4",
    },
    trailerUrl: {
        type: String,
        default: "test-trailer.mp4",
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

module.exports = mongoose.model("video", videoSchema);