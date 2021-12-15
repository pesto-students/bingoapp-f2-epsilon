const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie");
const CategoryController = require("../controllers/category");
const RatingController = require("../controllers/rating");
const PlaylistController = require("../controllers/playlist");
const BasedOnPreviousWatch = require("../controllers/based_on_previos_watch");
const VideoController = require("../controllers/video");
const { uploadS3,upload } = require("../middlewares/videoStorage");
// Movies Route
router.post("/write/movies/add", MovieController.movie_add);

router.put("/write/movies/update/:id", MovieController.movie_update);

router.delete("/write/movies/delete/:id", MovieController.movie_delete);

// Categories Route
router.post("/write/categories/add", CategoryController.category_add);

router.post("/write/video/upload", uploadS3.single("video_name"), VideoController.video_upload);

router.put("/write/categories/update/:id", CategoryController.category_update);

router.delete(
  "/write/categories/delete/:id",
  CategoryController.category_delete
);

// Movie Rating Routes
router.post("/write/rating/add", RatingController.rating_add);

// Movie Paylist Routes
router.post("/write/playlist/add", PlaylistController.playlist_add);

router.delete("/write/playlist/delete/:id", PlaylistController.playlist_delete);

// Based On Previous Watch Routes
router.post(
  "/write/based_on_previous_watch/add",
  BasedOnPreviousWatch.based_on_previous_watch_add
);

module.exports = router;
