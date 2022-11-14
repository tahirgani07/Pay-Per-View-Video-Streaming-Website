const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get("/:year/:month", async (req, res) => {
    const { year, month } = req.params;
    const { email } = req.query;
    
    try {
        var user = await User.findOne({ email });
        if(!user) return res.status(404).json({ message: "User not found" });
        
        var billIndex = user.bills.findIndex((cur) => cur.year == year);
        if(billIndex === -1) return res.status(200).json({ result: [] });

        var monthIndex = user.bills[billIndex].months.findIndex((cur) => cur.month == month);
        if(monthIndex === -1) return res.status(200).json({ result: [] });

        res.status(200).json({ result: user.bills[billIndex].months[monthIndex].movieWatchtimes });
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong." });
    }
});

router.post("/add", async (req, res) => {
    const { email, title, watchtime, year, month } = req.body;
    if((watchtime <= 0) || (title.trim() === "") || (email.trim() === "")) return;
    console.log(req.body);
    try {
        var user = await User.findOne({ email });
        if(!user) return res.status(404).json({ message: "User not found" });
        var billIndex = user.bills.findIndex((cur) => cur.year == year);
        if(billIndex === -1) user.bills.push({
            year: year,
        });
        billIndex = user.bills.findIndex((cur) => cur.year == year);
        var monthIndex = user.bills[billIndex].months.findIndex((cur) => cur.month == month);
        console.log(monthIndex)
        if(monthIndex === -1) user.bills[billIndex].months.push({ month: month });
        monthIndex = user.bills[billIndex].months.findIndex((cur) => cur.month == month);
        console.log(monthIndex)

        var movieWatchtimeIndex = user.bills[billIndex].months[monthIndex].movieWatchtimes.findIndex((cur) => cur.title == title);
        if(movieWatchtimeIndex === -1) {
            user.bills[billIndex].months[monthIndex].movieWatchtimes.push({
                title: title,
                watchtime: watchtime,
            });
        } else {
            var curWatchtime = Number(user.bills[billIndex].months[monthIndex].movieWatchtimes[movieWatchtimeIndex].watchtime) + Number(watchtime);
            user.bills[billIndex].months[monthIndex].movieWatchtimes[movieWatchtimeIndex].watchtime = String(curWatchtime);
        }
        await user.save();
        res.status(200).json({ message: "Successfully added the bill data." });
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong." });
    }
});

module.exports = router;