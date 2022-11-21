const mongoose = require("mongoose");
const bill = require("./bill");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bills: {
        type: [bill],
        default: [],
    },
    watchlist: {
        type: [String],
        default: [],
    },
    paymentAmount: {
        type: Number,
        default: 0,
    },
    blocked: {
        type: Boolean,
        default: false,
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

module.exports = mongoose.model("user", userSchema);