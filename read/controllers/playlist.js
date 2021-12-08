const mongoose = require("mongoose");
const { Playlist } = require("../models/playlist");

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
