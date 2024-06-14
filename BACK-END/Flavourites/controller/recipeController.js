const asyncHandler = require("express-async-handler");  // A middleware "npm install express-async-handler"
const Recipe = require("../model/recipeModel");
const UserDetail = require("../model/userModel");
const mongoose = require('mongoose');
const recipeModel = require("../model/recipeModel");



const createRecipe = asyncHandler(async function(req,res){

    // Before posting check if the passed user_id the body belongs to the user in JWT Token
    // userID taken from the JWT Token.

    const user_id = req.payload.userId;
    console.log("userIdFromJwtToken===", user_id);

    const {title, description, course, cuisine, instructions, prepTime, imageUrl} = req.body;

    if (!mongoose.isValidObjectId(user_id)) {
        res.status(400);
        throw new Error("Invalid user_id format. Must be a valid ID");
    }
    const userDatabase = UserDetail.findById(user_id);
    if(!userDatabase){
        res.status(404);
        throw new Error("Invalid ID, unable to create recipe");
    }

    if(!user_id || !title || !description || !course || !cuisine || !prepTime || !imageUrl){
       
        res.status(404);
        throw new Error("Mandatory field missing");
    }

    // const user_id = userIdFromJwtToken;
    const newRecipe = await Recipe.create({
        user_id,
        title,
        description,
        course,
        cuisine,
        instructions,
        prepTime,
        imageUrl,
    });
    console.log(newRecipe);
    if(!newRecipe){
        res.status(404);
        throw new Error("Unable to create New Recipe");
    }
    else{
        res.status(200).json(newRecipe);
    }


    console.log("recipe controller on");

});

const updateRecipe = asyncHandler(async (req,res)=>{
// check if the recipe belongs to the user before deleting it.
    
    const recipeDatabase = await Recipe.findById({ _id: req.query.recipeID });
    console.log("Recipe Database user ID",recipeDatabase.user_id);   //---matches
    console.log("JWT 2nd user ID",req.payload.userId);  //---matches

    // check if recipeDatabase exists or no?

    if(recipeDatabase && recipeDatabase.user_id.toString() === req.payload.userId){

        console.log("The recipe belongs to the User in the JWT Token");
        const updateRecipe = await Recipe.findByIdAndUpdate(req.query.recipeID, { $set: req.body }, { new: true }); // true is to Return the updated document
        
        if(!updateRecipe){
            res.status(404);
            throw new Error("No Recipe Found");
        }
        else{
            res.status(200).json(updateRecipe);
        }
    }
    else{
        console.log("The recipe Does not belong to the User in the JWT Token");
        res.status(404);
        throw new Error("The recipe Does not belong to the User in the JWT Token");
    }
});


// http://localhost:5000/recipes?recipeID=666a650dbdf04a7385da052d
const deleteRecipe = asyncHandler(async function(req,res){
    // check if the recipe belongs to the user without deleting other

    const recipeDatabase = await Recipe.findById({ _id: req.query.recipeID });
    console.log("Recipe Database user ID",recipeDatabase.user_id);   //---matches
    console.log("JWT 2nd user ID",req.payload.userId);  //---matches

    // check if recipeDatabase exists or no?

    if(recipeDatabase && recipeDatabase.user_id.toString() === req.payload.userId){

        console.log("The recipe belongs to the User in the JWT Token");
        const deletedRecipe = await recipeModel.findByIdAndDelete({ _id: req.query.recipeID });
        
        if(deleteRecipe){
            res.status(200).json(deletedRecipe);
        }
        else{
            res.status(404);
            throw new Error("Recipe Not Found");
        }
    }
    else{
        console.log("The recipe Does not belong to the User in the JWT Token");
        res.status(404);
        throw new Error("The recipe Does not belong to the User in the JWT Token");
    }
    
});

const findAllRecipesOfTheUser = asyncHandler(async function(req,res){

    const userId = req.payload.userId;

    const recipesOfTheUser = await recipeModel.find({ user_id: userId });

    if(!recipesOfTheUser){
        res.status(404);
        throw new Error("Recipe Not Found");
    }
    else{
        res.status(200).json(recipesOfTheUser);
    }


});

const findRecipeById = asyncHandler(async function(req,res){

    const recipe = await recipeModel.findById(req.params.id);
    console.log("recipeModel.findById =====",req.params.id);

    if(!recipe){

        res.status(404);
        throw new Error("Recipe Not Found");
    }
    else{
        res.status(200).json(recipe);
    }
});

module.exports = { createRecipe, updateRecipe, deleteRecipe, findAllRecipesOfTheUser, findRecipeById};

// Recipe Rating
// addRating, addStarRating, addLikes, addDislikes,
// Find recipe by username -- other model connect