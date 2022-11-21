const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Genre = require("../models/genre.js");
const movieDistancesMatrix = require("../movies_distance_matrix.json");
const movieIds = require("../movieIds.json");
const trendingMovies = require("../trending_movies.json");
const Movie = require("../models/movie.js");

router.get("/genres/:genre", async (req, res) => {
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

router.get("/recommended/:id", (req, res) => {
    const id = req.params.id;
    if(!id) return res.status(404).json({ message: "Id param is required." });
    var movieIndex = 0;
    for(let i = 0; i < movieIds.length; i++) {
        if(movieIds[i] == id) {
            movieIndex = i;
            break;
        }
    }
    var cur = []
    for(let i = 0; i < movieDistancesMatrix[movieIndex].length; i++) {
        cur.push([movieDistancesMatrix[movieIndex][i], movieIds[i]]);
    }
    cur.sort();
    cur.reverse();
    cur = cur.splice(1, 17).map(val => val[1]); // map is used to just get the index
    return res.status(200).json({ result: cur });
});

router.get("/trending", (req, res) => {
    res.status(200).json({ result: trendingMovies });
});

router.get("/search/all", async (req, res) => {
    const { searchTxt } = req.query;
    
    const movies = (await Movie.find()).filter((movie) => movie.title.toLocaleLowerCase().includes(searchTxt.toLocaleLowerCase()));

    res.status(200).json({ result: movies });
});

module.exports = router;