const mongoose = require("mongoose");
const { Movie } = require("../models/movie");
const fs = require("fs");
const path = require("path");
let reqPath = path.join(__dirname, "../../");

//Getting all Movies Data
exports.movies_all = (req, res) => {
  Movie.find({}, (err, data) => {
    if (!err) {
      res.status(200).json(data);
    } else {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  });
};

//Display Single Movie
exports.movie_show = (req, res) => {
  const id = req.params.id;
  Movie.findOne({ _id: id }, (err, docs) => {
    if (err) {
      res.status(404).json({ message: "No valid Movie found for provided ID" });
    } else {
      res.status(200).json({
        movie: docs,
      });
    }
  });
};

// Movie Detail Page
exports.movie_detail_show = (req, res) => {
  res.sendFile(reqPath + "/stream/front/video.html");
};

exports.movie_stream = (req, res) => {
  const id = req.params.id;
  Movie.findOne({ _id: id }, (err, docs) => {
    if (err) {
      res.status(404).json({ message: "No valid Movie found for provided ID" });
    } else {
      const range = req.headers.range;
      if (!range) {
        res.status(400).send("Requires Range header");
      }

      // get video stats
      const videoPath = reqPath + "files/videos/" + docs.video_name;
      const videoSize = fs.statSync(
        reqPath + "files/videos/" + docs.video_name
      ).size;

      // Parse Range
      // Example:
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
    }
  });
};
