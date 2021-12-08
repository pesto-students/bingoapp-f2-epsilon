const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie");
const CategoryController = require("../controllers/category");
const RatingController = require("../controllers/rating");
const PlaylistController = require("../controllers/playlist");
const BasedOnPreviousWatch = require("../controllers/based_on_previos_watch");

// Movies Route
router.get("/api/movies", MovieController.movies_all);

router.get("/api/movies/:id", MovieController.movie_show);

router.get("/api/search/:keyword", MovieController.movie_search);

router.get("/api/categories/search/:keyword", MovieController.category_search);

// Categories Route
router.get("/api/categories", CategoryController.categories_all);

router.get("/api/categories/:id", CategoryController.category_show);

// Movie Rating Routes

router.get("/api/rating/show", RatingController.rating_show);

// Movie Paylist Routes

router.get("/api/playlist/show", PlaylistController.playlist_show);

// Based On Previous Watch Routes

router.get(
  "/api/based_on_previous_watch/show",
  BasedOnPreviousWatch.based_on_previous_watch_show
);

module.exports = router;
