const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const port = process.env.PORT || 8002;

//BLQr0hViTatJw5Hb
const app = express();
app.use(cors());
app.options('*', cors());
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
