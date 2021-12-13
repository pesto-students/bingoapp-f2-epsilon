const mongoose = require("mongoose");
const { BasedOnPreviousWatch } = require("../models/based_on_previos_watch");

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
