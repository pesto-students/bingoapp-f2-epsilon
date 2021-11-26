const express = require("express");
const router = express.Router();

const MovieController = require("../controllers/movie");

router.post("/api/movie/add" , MovieController.movie_add);

module.exports = router;