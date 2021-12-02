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

//Showing Dedicated Playlist
exports.playlist_show = (req, res) => {
  console.log(req.query.email)
  Playlist.find({ email: req.query.email }, (err, data) => {
    if (!err) {
      for (var i in data) {
      var finalData = [];
        if (data[i].movie) {
          finalData.push(data[i]);
        }
      }
      res.status(200).json(finalData);
    } else {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  }).populate("movie");
};
