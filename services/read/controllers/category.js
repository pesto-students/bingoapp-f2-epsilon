const mongoose = require("mongoose");
const { Category } = require("../models/category");
// const { createClient } = require('redis');
// const client = require("../initRedis");
// Getting all Category Data
exports.categories_all = async (req, res) => {
  //change host to localhost and port accordingly
  // const client = createClient({host: '0.0.0.0', port: 6379});
  // let searchTerm = "categories_all";
  // const value = await client.get(searchTerm);
  // if (value) {
  //   console.log("catch hit");
  //   res.status(200).json(JSON.parse(value));
  // } else {
  //   console.log("catch miss");
    Category.find({},async (err, data) => {
      if (!err) {
        res.status(200).json(data);
        // await client.set(searchTerm, JSON.stringify(data));
      } else {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      }
    });
  // }
};

//Display Single Category
exports.category_show = (req, res) => {
  const id = req.params.id;
  Category.findOne({ _id: id }, (err, docs) => {
    if (err) {
      res
        .status(404)
        .json({ message: "No valid Category found for provided ID" });
    } else {
      res.status(200).json({
        category: docs,
      });
    }
  });
};
