const mongoose = require("mongoose");
const { Movie } = require("../models/movie");
// const client = require("../initRedis");

//Getting all Movies Data
exports.movies_all = async (req, res) => {
  let pageNum = req.query.page ? req.query.page : "1";
  // let searchTerm = `movies_all/page/${pageNum}`;
  // console.log("movies all",req)
  // const value = await client.get(searchTerm);
  // if (value) {
  //   res.status(200).json(JSON.parse(value));
  // } else {
    Movie.paginate(
      {},
      {
        limit: 8,
        page: pageNum,
        populate: "categories",
      },
      async (err, data) => {
        if (!err) {
          res.status(200).json(data);
          // await client.set(searchTerm, JSON.stringify(data));
        } else {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        }
      }
    );
  // }
};

//Display Single Movie
exports.movie_show =async (req, res) => {
  const id = req.params.id;
  // let searchTerm = `movie_show/${id}`;
  // const value = await client.get(searchTerm);
  // if (value) {
  //   res.status(200).json(JSON.parse(value));
  // }else{
    Movie.findOne({ _id: id },async (err, docs) => {
      if (err) {
        res.status(404).json({ message: "No valid Movie found for provided ID" });
      } else {
        res.status(200).json({
          movie: docs,
        });
        // await client.set(searchTerm, JSON.stringify({movie:docs}));
      }
    }).populate("categories");
  // }
};

// Search Movies
exports.movie_search = (req, res) => {
  Movie.paginate(
    {
      $or: [
        { name: { $regex: req.params.keyword, $options: "i" } },
        { cast: { $regex: req.params.keyword, $options: "i" } },
      ],
    },
    {
      limit: 8,
      page: req.query.page ? req.query.page : "1",
      populate: "categories",
    },
    (err, docs) => {
      if (err) {
        res
          .status(404)
          .json({ message: "No valid Movie found for provided Search", err });
      } else if (docs.docs.length != 0) {
        res.status(200).json({
          movie: docs,
        });
      } else {
        res.status(200).json({ message: "No Results Found" });
      }
    }
  );
};

// Search Categories
exports.category_search = async(req, res) => {
  // const searchTerm=`category_search:${req.params.keyword}`
  // const value = await client.get(searchTerm);
  // if (value) {
  //   res.status(200).json(JSON.parse(value));
  // }else{
    Movie.find({}, async(err, data) => {
      if (!err) {
        var finalData = [];
        for (var i in data) {
          if (data[i].categories.length !== 0) {
            finalData.push(data[i]);
          }
        }
        res.status(200).json({
          movie: {docs:finalData} ,
        });
        // await client.set(searchTerm, JSON.stringify({movie:finalData}));
      } else {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      }
    }).populate({
      path: "categories",
      match: { name: { $regex: req.params.keyword, $options: "i" } },
    });
  // }
};
