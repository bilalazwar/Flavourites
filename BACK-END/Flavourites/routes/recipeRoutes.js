require("dotenv").config();
const express = require("express");
const router = express.Router();
const { createRecipe, updateRecipe, deleteRecipe, findAllRecipesOfTheUser, findRecipeById } = require("../controller/recipeController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/", validateToken, createRecipe);
router.put("/", validateToken, updateRecipe);
router.delete("/", validateToken, deleteRecipe);
router.get("/", validateToken, findAllRecipesOfTheUser);
router.get("/:id", validateToken, findRecipeById);


module.exports = router;