require("dotenv").config();
const express = require("express");
const router = express.Router();
const { createRecipe, updateRecipe, deleteRecipe, findAllRecipesOfTheUser, findRecipeById } = require("../controller/recipeController");
const { getAllRating, getRating, createRating, updateRating, deleteRating} = require("../controller/ratingController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/", validateToken, createRecipe);
router.put("/", validateToken, updateRecipe);
router.delete("/", validateToken, deleteRecipe);
router.get("/", validateToken, findAllRecipesOfTheUser);
router.get("/:id", validateToken, findRecipeById);


router.get("/ratings/all-ratings", getAllRating);
router.get("/:recipeId/ratings", validateToken, getRating);
router.post("/:recipeId/ratings", validateToken, createRating);
router.put("/ratings/:ratingId", validateToken, updateRating);
router.delete("/ratings/:ratingId", validateToken, deleteRating);


module.exports = router;