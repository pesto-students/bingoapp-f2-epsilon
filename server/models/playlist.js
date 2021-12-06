const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

//Model for Playlist
const myPlaylist = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    require: true,
  },
});

myPlaylist.plugin(mongoosePaginate);
const Playlist = mongoose.model("Playlist", myPlaylist);

module.exports = { Playlist };
