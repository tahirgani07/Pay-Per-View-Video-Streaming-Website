const mongoose = require("mongoose");

const movieWatchtimeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    watchtime: {
        type: Number,
        required: true,
    },
});

const monthSchema = new mongoose.Schema({
    month: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        default: 0,
    },
    totalPaid: {
        type: Number,
        default: 0,
    },
    movieWatchtimes: {
        type: [movieWatchtimeSchema],
        default: [],
    },
});

const billSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
    },
    months: {
        type: [monthSchema],
        default: [],
    },
});

module.exports = billSchema;