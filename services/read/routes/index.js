const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie");
const CategoryController = require("../controllers/category");
const RatingController = require("../controllers/rating");
const PlaylistController = require("../controllers/playlist");
const BasedOnPreviousWatch = require("../controllers/based_on_previos_watch");

// Movies Route
router.get("/read/movies", MovieController.movies_all);

router.get("/read/movies/:id", MovieController.movie_show);

router.get("/read/search/:keyword", MovieController.movie_search);

router.get("/read/categories/search/:keyword", MovieController.category_search);

// Categories Route
router.get("/read/categories", CategoryController.categories_all);

router.get("/read/categories/:id", CategoryController.category_show);

// Movie Rating Routes

router.get("/read/rating/show", RatingController.rating_show);

// Movie Paylist Routes

router.get("/read/playlist/show", PlaylistController.playlist_show);

// Based On Previous Watch Routes

router.get(
  "/read/based_on_previous_watch/show",
  BasedOnPreviousWatch.based_on_previous_watch_show
);

module.exports = router;
