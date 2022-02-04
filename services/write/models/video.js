const mongoose = require("mongoose");

const Video = mongoose.model("Video", {
  video_name: {
    type: String,
    required: true,
  },
});

module.exports = { Video };
