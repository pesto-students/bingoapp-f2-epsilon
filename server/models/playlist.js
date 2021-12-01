const mongoose = require("mongoose");

//Model for User
const Playlist = mongoose.model("Playlist", {
  email: {
    type: String,
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    require: true
  },
});

module.exports = { Playlist };
