const express = require("express");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

//BLQr0hViTatJw5Hb
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Silence is Golden");
});

const connectDB = require("./config/db");
// Load Config
dotenv.config({ path: "./config/config.env" });

connectDB();

//Routes
app.use("/", require("./routes/index"));

app.listen(port);
