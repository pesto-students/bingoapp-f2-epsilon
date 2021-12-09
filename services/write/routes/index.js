const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie");
const CategoryController = require("../controllers/category");
const RatingController = require("../controllers/rating");
const PlaylistController = require("../controllers/playlist");
const BasedOnPreviousWatch = require("../controllers/based_on_previos_watch");

// Movies Route
router.post("/api/movies/add", MovieController.movie_add);

router.put("/api/movies/update/:id", MovieController.movie_update);

router.delete("/api/movies/delete/:id", MovieController.movie_delete);

// Categories Route
router.post("/api/categories/add", CategoryController.category_add);

router.put("/api/categories/update/:id", CategoryController.category_update);

router.delete("/api/categories/delete/:id", CategoryController.category_delete);

// Movie Rating Routes
router.post("/api/rating/add", RatingController.rating_add);

// Movie Paylist Routes
router.post("/api/playlist/add", PlaylistController.playlist_add);

router.delete("/api/playlist/delete/:id", PlaylistController.playlist_delete);

// Based On Previous Watch Routes
router.post(
  "/api/based_on_previous_watch/add",
  BasedOnPreviousWatch.based_on_previous_watch_add
);

module.exports = router;
