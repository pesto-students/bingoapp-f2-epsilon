const mongoose = require("mongoose");
const { BasedOnPreviousWatch } = require("../models/based_on_previos_watch");
const { Movie } = require("../models/movie");

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
        Movie.paginate(
          {
            $and: [
              {
                cast: { $in: finalData[0].cast },
              },
              {
                categories: { $in: finalData[0].categories },
              },
            ],
          },
          {
            limit: 8,
            page: req.query.page ? req.query.page : "1",
            populate: "categories",
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
        );
      } else {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      }
    }
  );
};
