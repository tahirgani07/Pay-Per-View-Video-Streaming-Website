const express = require("express");
const router = express.Router();
const fs = require("fs");
const videos = require("../video-info.json");
const genre = require("../models/genre");

router.get("/", async function(req, res) {
    var reqGenre = req.query.genre;
    console.log(reqGenre);
    if(!reqGenre) {
      return res.status(400).send("Requires a genre");
    }
    try {
      const doc = await genre.findOne({ name: reqGenre });
      if(doc == null) {
        console.log("Doc not found");
        res.send([]);
        return;
      }
      await doc.populate('videos');
      res.send(doc.videos);
    } catch(e) {
      console.log(e.message);
      res.send(e.message);
    }
  });
  
  
  ////////////////////////
  
  router.get("/stream/:id", function (req, res) {
    // Ensure there is a range given for the video
    const range = req.headers.range;
    const id = req.params.id;
    if (!range) {
      res.status(400).send("Requires Range header");
    }
  
    var filename = "";
    for(var i = 0; i < videos.length; i++) {
      if(videos[i].id === id) {
          filename = videos[i].filename;
          break;
      }
    }
    
    if(filename === "") {
      res.status(400).send("Invalid id");
    }
  
    // get video stats (about 61MB)
    const videoPath = `videos/${filename}`;
    const videoSize = fs.statSync(videoPath).size;
  
    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  
    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
  
    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
  
    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });
  
    // Stream the video chunk to the client
    videoStream.pipe(res);
  });

  module.exports = router;