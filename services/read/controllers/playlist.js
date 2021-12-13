const mongoose = require("mongoose");
const { Playlist } = require("../models/playlist");
const client = require("../initRedis");

//Showing Dedicated Playlist
exports.playlist_show =async (req, res) => {
  console.log(req.query.email);
  let pageNum=req.query.page ? req.query.page : "1"
  let searchTerm = `playlist_show/${req.query.email}/${pageNum}`;
  const value = await client.get(searchTerm);
  if (value) {
    res.status(200).json(JSON.parse(value));
  }else{
    Playlist.paginate(
      { email: req.query.email },
      {
        limit: 8,
        page: pageNum,
        populate: "movie",
      },
      async(err, data) => {
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
          await client.set(searchTerm, JSON.stringify(finalObj));
        } else {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        }
      }
    );
  }
  
};
