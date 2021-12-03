const mongoose = require("mongoose");
const { BasedOnPreviousWatch } = require("../models/based_on_previos_watch");
const { Movie } = require("../models/movie");

exports.based_on_previous_watch_add = (req, res) => {
  BasedOnPreviousWatch.find(
    {
      email: req.body.email,
      categories: req.body.categories,
      cast: req.body.cast,
    },
    (notFound, found) => {
      if (found.length > 0) {
        res.status(200).json({
          message: "Already There",
          found,
        });
      } else {
        const based_on_previous_watch = new BasedOnPreviousWatch({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          categories: req.body.categories,
          cast: req.body.cast,
        });
        based_on_previous_watch
          .save()
          .then((result) => {
            res.status(201).json({
              message: "Added To Based on Watch",
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

exports.based_on_previous_watch_show = (req, res) => {
  BasedOnPreviousWatch.aggregate(
    [
      {
        $match: { email: req.query.email },
      },
      {
        $group: {
          _id: "$email",
          all_cast: { $push: "$cast" },
          all_categories: { $push: "$categories" },
        },
      },
    ],
    (err, data) => {
      if (!err) {
        var finalData = [];
        for (const key in data) {
          var all_cast = data[key].all_cast;
          var all_categories = data[key].all_categories;
          var all_cast_array = [];
          for (const key in all_cast) {
            all_cast_array.push(...all_cast[key]);
          }
          var all_categories_array = [];
          for (const key in all_categories) {
            all_categories_array.push(...all_categories[key]);
          }
          let final_cast_array = all_cast_array.filter((c, index) => {
            return all_cast_array.indexOf(c) === index;
          });
          let final_categories_array = all_categories_array.filter(
            (c, index) => {
              return all_categories_array.indexOf(c) === index;
            }
          );
          finalData.push({
            _id: data[key]._id,
            categories: final_categories_array,
            cast: final_cast_array,
          });
        }
        Movie.find(
          {
            $or: [
              {
                cast: { $in: finalData[0].cast },
              },
              {
                categories: { $in: finalData[0].categories },
              },
            ],
          },
          (err, docs) => {
            if (!err) {
              res.status(200).json(docs);
            } else {
              res.status(500).json({
                error: err,
              });
            }
          }
        ).populate("categories");
      } else {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      }
    }
  );
};
