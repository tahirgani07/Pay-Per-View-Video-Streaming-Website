const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get("/", async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email });

        if(!user) return res.status(404).json({ message: "User doesn't exist." });
        console.log(user.watchlist);
        res.status(200).json({ result: user.watchlist });
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong." });
    }
});

router.post("/add", async (req, res) => {
    const { email, movieId } = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({ email });

        if(!user) return res.status(404).json({ message: "User doesn't exist." });

        var movieIndex = user.watchlist.findIndex((cur) => cur === movieId);
        var message = "";
        if(movieIndex === -1) {
            // movie does not exist in the watchlist so add it
            user.watchlist.push(movieId);
            message = "Movie successfully added to watchlist.";
        } else {
            // movie exists in the watchlist so remove it
            user.watchlist = user.watchlist.filter((cur) => cur !== movieId);
            message = "Movie successfully removed from watchlist.";
        }
        await user.save();
        res.status(200).json({ message: message });
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong." });
    }
});

router.get("/check/:id", async (req, res) => {
    const { email } = req.query;
    const id = req.params.id;
    if(id.trim() === "") return res.status(400).json({ message: "Id is required." });

    try {
        const user = await User.findOne({ email });

        if(!user) return res.status(404).json({ message: "User doesn't exist." });

        var movieIndex = user.watchlist.findIndex((cur) => cur === id);
        console.log(movieIndex)
        var exists = false;
        if(movieIndex === -1) {
            // movie does not exist
            exists = false;
        } else {
            // movie exists in the watchlist
            exists = true;
        }
        res.status(200).json({ result: exists });
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong." });
    }
});

module.exports = router;