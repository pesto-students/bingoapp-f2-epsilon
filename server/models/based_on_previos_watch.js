const mongoose = require("mongoose");

//Model for BasedOnPreviousWatch table
const BasedOnPreviousWatch = mongoose.model("BasedOnPreviousWatch", {
  email: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  cast: [
    {
      type: String,
    },
  ],
});

module.exports = { BasedOnPreviousWatch };
