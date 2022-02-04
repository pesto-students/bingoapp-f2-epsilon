const mongoose = require("mongoose");
//Model for Movie table
const Category = mongoose.model("Category", {
  name: {
    type: String,
    required: true,
  },
});

module.exports = { Category };
