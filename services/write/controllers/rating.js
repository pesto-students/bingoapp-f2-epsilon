const mongoose = require("mongoose");
const { Rating } = require("../models/rating");

// Add new Rating
exports.rating_add = (req, res) => {
  Rating.find(
    { email: req.body.email, movie_id: req.body.movie_id },
    (notFound, found) => {
      if (found.length > 0) {
        res.status(200).json({
          message: "You have already given the rating",
          found,
        });
      } else {
        const rating = new Rating({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          movie_id: req.body.movie_id,
          rating: req.body.rating,
        });
        rating
          .save()
          .then((result) => {
            res.status(201).json({
              message: "Rating Submitted successfully",
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      }
    }
  );
};
