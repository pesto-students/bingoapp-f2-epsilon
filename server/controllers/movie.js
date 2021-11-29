const mongoose = require("mongoose");
const { Movie } = require("../models/movie");

//Getting all Movies Data
exports.movies_all = (req, res) => {
  Movie.find({}, (err, data) => {
    if (!err) {
      const response = {
        count: data.length,
        movies: data.map((doc) => {
          return {
            movie: doc,
          };
        }),
      };
      res.status(200).json(response);
    } else {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  }).populate("categories");
};

// Creating a New Movie
exports.movie_add = (req, res) => {
  const movie = new Movie({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    video_name: req.body.video_name,
    image: req.body.image,
    duration: req.body.duration,
    language: req.body.language,
    categories: req.body.categories,
    rating: req.body.rating,
    artists: req.body.artists,
    tags: req.body.tags,
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

//Display Single Movie
exports.movie_show = (req, res) => {
  const id = req.params.id;
  Movie.findOne({ _id: id }, function (err, docs) {
    if (err) {
      res.status(404).json({ message: "No valid Movie found for provided ID" });
    } else {
      res.status(200).json({
        movie: docs,
      });
    }
  }).populate("categories");
};

//Update Movie
exports.movie_update = (req, res) => {
  const movie = {
    name: req.body.name,
    video_name: req.body.video_name,
    duration: req.body.duration,
    language: req.body.language,
    categories: req.body.categories,
    rating: req.body.rating,
    artists: req.body.artists,
    tags: req.body.tags,
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
