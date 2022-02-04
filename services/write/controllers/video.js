const mongoose = require("mongoose");
const { Video } = require("../models/video");
var ffmpeg = require("fluent-ffmpeg");
const { Movie } = require("../models/movie");
const fs = require("fs");
const path = require("path");
let reqPath = path.join(__dirname, "../");

// Video Upload
exports.video_upload = (req, res) => {
  // console.log('req',req)
  const video = new Video({
    _id: new mongoose.Types.ObjectId(),
    video_name: req.file.fieldname,
  });
  video
    .save()
    .then((result) => {
      console.log(result, req.file,req);
      res.status(201).json({
        message: "Video uploaded successfully",
        status: 1,
        location:req.file.location,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.video_thumbnail = (req, res) => {
  const video = new Video({
    _id: new mongoose.Types.ObjectId(),
    video_name: req.file.fieldname,
  });
  video
    .save()
    .then((result) => {
      console.log(result, "reslut");
      res.status(201).json({
        message: "Image uploaded successfully",
        status: 1,
        location: req.file.location,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
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
      } else {
        // get video stats
        const videoPath = "./videos/" + docs.video_name;
        const videoSize = fs.statSync(
          "./videos/" + docs.video_name
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
    }
  });
};
