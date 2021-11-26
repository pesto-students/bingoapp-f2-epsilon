const mongoose = require("mongoose");
const { Movie } = require("../models/movie");

exports.movie_add = (req, res) => {
  const movie = new Movie({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    video_name: req.body.video_name,
    duration: req.body.duration,
    language: req.body.language,
    rating: req.body.rating,
    artists: req.body.artists,
    tags: req.body.tags,
  });
  movie
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created Shipment successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
