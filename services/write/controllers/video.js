const mongoose = require("mongoose");
const { Video } = require("../models/video");

// Video Upload
exports.video_upload = (req, res) => {
    // console.log('req',req)
  const video = new Video({
    _id: new mongoose.Types.ObjectId(),
    video_name: req.file.fieldname,
  });
  video
    .save()
    .then((result) => {
      console.log(result,"reslut");
      res.status(201).json({
        message: "Video uploaded successfully",
        status:1,
        location:req.file.location
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
