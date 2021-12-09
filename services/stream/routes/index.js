const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie");

// Movies Route
router.get("/stream/movies/:id", MovieController.movie_stream);

router.get("/stream/moviedetailjson/:id", MovieController.movies_detail_json);

router.get("/stream/watch/:id", MovieController.movie_detail_show);

module.exports = router;
