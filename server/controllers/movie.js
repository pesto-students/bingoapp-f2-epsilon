const mongoose = require("mongoose");
const { Movie } = require("../models/movie");

//Getting all Movies Data
exports.movies_all = (req, res) => {
  Movie.paginate(
    {},
    {
      limit: 8,
      page: req.query.page ? req.query.page : "1",
      populate: "categories",
    },
    (err, data) => {
      if (!err) {
        res.status(200).json(data);
      } else {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      }
    }
  );
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
  }).populate("categories");
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

// Search Movies
exports.movie_search = (req, res) => {
  Movie.paginate(
    {
      $or: [
        { name: { $regex: req.params.keyword, $options: "i" } },
        { cast: { $regex: req.params.keyword, $options: "i" } },
      ],
    },
    {
      limit: 8,
      page: req.query.page ? req.query.page : "1",
      populate: "categories",
    },
    (err, docs) => {
      if (err) {
        res
          .status(404)
          .json({ message: "No valid Movie found for provided Search", err });
      } else if (docs.docs.length != 0) {
        res.status(200).json({
          movie: docs,
        });
      } else {
        res.status(200).json({ message: "No Results Found" });
      }
    }
  );
};

// Search Categories
exports.category_search = (req, res) => {
  Movie.paginate(
    {},
    {
      limit: 8,
      page: req.query.page ? req.query.page : "1",
      populate: {
        path: "categories",
        match: { name: { $regex: req.params.keyword, $options: "i" } },
      },
    },
    (err, data) => {
      if (!err) {
        var finalData = [];
        for (var i in data.docs) {
          if (data.docs[i].categories.length !== 0) {
            finalData.push(data.docs[i]);
          }
        }
        res.status(200).json({
          movie: finalData,
        });
      } else {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      }
    }
  );
};
