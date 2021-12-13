const mongoose = require("mongoose");
const { Category } = require("../models/category");

// Creating new Category
exports.category_add = (req, res) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  });
  category
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Category Created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Update Category
exports.category_update = (req, res) => {
  const category = {
    name: req.body.name,
  };
  Category.findByIdAndUpdate(
    req.params.id,
    { $set: category },
    { new: true },
    (err, data) => {
      if (!err) {
        res.status(200).json({
          code: 200,
          message: "Category Updated Successfully",
          updateCategory: data,
        });
      } else {
        res.status(500).json({
          error: err,
        });
      }
    }
  );
};

// Delete Category
exports.category_delete = (req, res) => {
  Category.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res
        .status(200)
        .json({ code: 200, message: "Category deleted", deleteCategory: data });
    } else {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  });
};
