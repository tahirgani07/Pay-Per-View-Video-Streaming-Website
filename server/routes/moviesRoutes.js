const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Genre = require("../models/genre.js");

router.get("/:genre", async (req, res) => {
    const genre = req.params.genre.toLowerCase();
    var count = req.query.count;
    if(!count || count == '') count = '20';
    count = Number(count);
    const doc = await Genre.findOne({ name: genre });
    if(!doc) {
        return res.status(404).json({ message: "Genre not found." });
    }
    return res.status(200).json({ result: doc.movies.splice(0, Math.min(count, doc.movies.length)), });
});

module.exports = router;