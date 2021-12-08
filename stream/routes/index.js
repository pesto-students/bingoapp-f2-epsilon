const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie");

// Movies Route
router.get("/api/movies", MovieController.movies_all);

router.get("/api/movies/:id", MovieController.movie_show);

router.get("/movies/:id", MovieController.movie_stream);

router.get("/watch/:id", MovieController.movie_detail_show);

module.exports = router;
