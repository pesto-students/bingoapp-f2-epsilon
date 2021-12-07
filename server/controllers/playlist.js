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
  console.log(req.query.email);
  Playlist.paginate(
    { email: req.query.email },
    {
      limit: 8,
      page: req.query.page ? req.query.page : "1",
      populate: "movie",
    },
    (err, data) => {
      if (!err) {
        var finalData = [];
        for (var i in data.docs) {
          if (data.docs[i].movie != null) {
            finalData.push(data.docs[i]);
          }
        }
        let finalObj={
          totalDocs: data.totalDocs,
          limit: data.limit,
          totalPages: data.totalPages,
          page: data.page,
          pagingCounter: data.pagingCounter,
          hasPrevPage: data.hasPrevPage,
          hasNextPage: data.hasNextPage,
          prevPage: data.prevPage,
          nextPage: data.nextPage,
          docs:finalData
        }
        res.status(200).json(finalObj);
      } else {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      }
    }
  );
};

exports.playlist_delete = (req, res) => {
  Playlist.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res
        .status(200)
        .json({ code: 200, message: "Playlist Item Deleted deleted", deletePlaylist: data });
    } else {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  });
};
