const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
require("mongoose-type-url");
//Model for Movie table

const myMovie = new mongoose.Schema({
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

myMovie.plugin(mongoosePaginate);
const Movie = mongoose.model("Movie", myMovie);

module.exports = { Movie };
