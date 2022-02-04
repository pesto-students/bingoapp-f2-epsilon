const mongoose = require("mongoose");
const { Playlist } = require("../models/playlist");

// Adding Movie to the playlist
exports.playlist_add = (req, res) => {
  Playlist.find(
    { email: req.body.email, movie: req.body.movie },
    (notFound, found) => {
      if (found.length > 0) {
        res.status(200).json({
          message: "Movie is already in the playlist",
          found,
        });
      } else {
        const playlist = new Playlist({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          movie: req.body.movie,
        });
        playlist
          .save()
          .then((result) => {
            res.status(201).json({
              message: "Added to Playlist",
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

//Deleting playlist item
exports.playlist_delete = (req, res) => {
  Playlist.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).json({
        code: 200,
        message: "Playlist Item Deleted deleted",
        deletePlaylist: data,
      });
    } else {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  });
};
