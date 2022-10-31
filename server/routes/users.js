const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET);

        res.status(200).json({ result: existingUser, token });
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong." });
    }
});

router.post("/signup", async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exist." });

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });
        
        const hashedPassword = await bcrypt.hash(password, 12); //salt is basically level of difficulty to hash the password, usually 12 is used.
        
        const result = await User.create({ email, password: hashedPassword, name: name });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET);

        res.status(200).json({ result, token });
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong." });
    }
});

module.exports = router;