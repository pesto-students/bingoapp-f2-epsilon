const mongoose = require("mongoose");
const { BasedOnPreviousWatch } = require("../models/based_on_previos_watch");

exports.based_on_previous_watch_add = (req, res) => {
  const based_on_previous_watch_add = new BasedOnPreviousWatch({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    categories: req.body.categories,
    cast: req.body.cast,
  });
  based_on_previous_watch_add
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Movie Type Added to Based On Previous Watched list",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.based_on_previous_watch_show = (req, res) => {
  BasedOnPreviousWatch.aggregate(
    [
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
        for (const key in data) {
          var all_cast = data[key].all_cast;
          var all_array = [];
          for (const key in all_cast) {
            
            all_array.push(...all_cast[key]);
          }
          console.log(all_array);
        }
        let array1 = data[0].all_cast;
        let array2 = data[0].all_categories;
        let array3 = array1.concat(array2);
        array3 = [...new Set(...array1)];
        res.status(200).json(array3);
      } else {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      }
    }
  );
};
