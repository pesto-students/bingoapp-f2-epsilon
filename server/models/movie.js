const mongoose = require("mongoose");
require("mongoose-type-url");

//Model for Movie table
const Movie = mongoose.model("Movie", {
  name: {
    type: String,
    required: true,
  },
  video_name: {
    type: String,
    required: true,
  },
  image: { type: mongoose.SchemaTypes.Url, require: true },
  duration: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    default: new Date().getFullYear(),
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  cast: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
});

module.exports = { Movie };
