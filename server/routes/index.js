const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/auth-login");
const { checkIfAuthenticated } = require("../controllers/user-auth");
const MovieController = require("../controllers/movie");
const CategoryController = require("../controllers/category");

router.post("/api/auth/login", LoginController.createUser);

// Movies Route
router.get("/api/movies", checkIfAuthenticated, MovieController.movies_all);

router.post("/api/movies/add", MovieController.movie_add);

router.get("/api/movies/:id", MovieController.movie_show);

router.put("/api/movies/update/:id", MovieController.movie_update);

router.delete("/api/movies/delete/:id", MovieController.movie_delete);

// Categories Route
router.get("/api/categories", CategoryController.categories_all);

router.post("/api/categories/add", CategoryController.category_add);

router.get("/api/categories/:id", CategoryController.category_show);

router.put("/api/categories/update/:id", CategoryController.category_update);

router.delete("/api/categories/delete/:id", CategoryController.category_delete);

module.exports = router;
