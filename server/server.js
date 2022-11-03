const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/usersRoutes");
const videoRoutes = require("./routes/videoRoutes");
const movieRoutes = require("./routes/moviesRoutes");
require('dotenv/config');

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("MongoDB connected");
});

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/video", videoRoutes);
app.use("/movies", movieRoutes);

app.listen(process.env.PORT, function () {
  console.log("Listening on port 8000!");
});