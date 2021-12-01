const express = require("express");
const router = express.Router();
const LoginController = require("../firebase-auth/user-signup");
const {
  checkIfAuthenticated,
  checkIfAdmin,
} = require("../firebase-auth/user-auth");
const { makeUserAdmin } = require("../firebase-auth/admin-user");
const MovieController = require("../controllers/movie");
const CategoryController = require("../controllers/category");
const RatingController = require("../controllers/rating");

router.post("/api/auth/login", LoginController.createUser);

// router.post("/api/auth/admin", checkIfAuthenticated, makeUserAdmin);

// Movies Route
router.get("/api/movies", checkIfAuthenticated, MovieController.movies_all);

router.post("/api/movies/add", checkIfAdmin, MovieController.movie_add);

router.get("/api/movies/:id", checkIfAuthenticated, MovieController.movie_show);

router.put(
  "/api/movies/update/:id",
  checkIfAdmin,
  MovieController.movie_update
);

router.delete(
  "/api/movies/delete/:id",
  checkIfAdmin,
  MovieController.movie_delete
);

router.get(
  "/api/search/:keyword",
  checkIfAuthenticated,
  MovieController.movie_search
);

router.get(
  "/api/categories/search/:keyword",
  checkIfAuthenticated,
  MovieController.category_search
);

// Categories Route
router.get(
  "/api/categories",
  checkIfAuthenticated,
  CategoryController.categories_all
);

router.post(
  "/api/categories/add",
  checkIfAdmin,
  CategoryController.category_add
);

router.get(
  "/api/categories/:id",
  checkIfAuthenticated,
  CategoryController.category_show
);

router.put(
  "/api/categories/update/:id",
  checkIfAdmin,
  CategoryController.category_update
);

router.delete(
  "/api/categories/delete/:id",
  checkIfAdmin,
  CategoryController.category_delete
);

// Movie Rating Routes
router.post(
  "/api/rating/add",
  checkIfAuthenticated,
  RatingController.rating_add
);

router.get(
  "/api/rating/show",
  checkIfAuthenticated,
  RatingController.rating_show
);

module.exports = router;
