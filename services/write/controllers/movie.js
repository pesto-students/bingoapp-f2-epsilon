const mongoose = require("mongoose");
const { Movie } = require("../models/movie");

// Creating a New Movie
exports.movie_add = (req, res) => {
  const movie = new Movie({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    video_name: req.body.video_name,
    image: req.body.image,
    duration: req.body.duration,
    language: req.body.language,
    year: req.body.year,
    categories: req.body.categories,
    cast: req.body.cast,
    description: req.body.description,
  });
  movie
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created Movie successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//Update Movie
exports.movie_update = (req, res) => {
  const movie = {
    name: req.body.name,
    video_name: req.body.video_name,
    duration: req.body.duration,
    language: req.body.language,
    year: req.body.year,
    categories: req.body.categories,
    cast: req.body.cast,
    description: req.body.description,
  };
  Movie.findByIdAndUpdate(
    req.params.id,
    { $set: movie },
    { new: true },
    (err, data) => {
      if (!err) {
        res.status(200).json({
          code: 200,
          message: "Movie Updated Successfully",
          updateMovie: data,
        });
      } else {
        console.log("update", err);
        res.status(500).json({
          error: err,
        });
      }
    }
  );
};

// Delete Movie
exports.movie_delete = (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res
        .status(200)
        .json({ code: 200, message: "Movie deleted", deleteMovie: data });
    } else {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  });
};
