const mongoose = require("mongoose");

//Model for Movie Rating table
const Rating = mongoose.model("Rating", {
  email: {
    type: String,
    required: true,
  },
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  rating: {
    type: Number,
    default: 1,
    min: 1,
    max: 5,
  },
});

module.exports = { Rating };
