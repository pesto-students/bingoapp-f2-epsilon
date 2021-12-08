const mongoose = require("mongoose");
const { Rating } = require("../models/rating");

// Show aggragate Rating
exports.rating_show = (req, res) => {
  Rating.aggregate(
    [
      {
        $group: {
          _id: "$movie_id",
          avg_rating: { $avg: "$rating" },
        },
      },
      { $sort: { avg_rating: -1 } },
    ],
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
