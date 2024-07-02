const asyncHandler = require("express-async-handler");  // A middleware "npm install express-async-handler"
const RatingModel = require("../model/ratingModel");
// const RecipeModel = require("../model/recipeModel");
const mongoose = require('mongoose');
const recipeModel = require("../model/recipeModel");
const ratingModel = require("../model/ratingModel");


const getAllRating = asyncHandler(async function(req,res){

    const allRatings = await ratingModel.find();

    console.log("All Ratings ======",allRatings );

    if(allRatings.length === 0 ){
        res.status(404);
        throw new Error("No Ratings Found");
    }
    else{
        res.status(200).json(allRatings);
    }

    console.log("All Ratings ======");
});

const getRating = asyncHandler(async function(req,res){
    
    const recipe_id = req.params.recipeId;
    console.log("The url id ============== ", recipe_id);

    const recipeRating = await ratingModel.find({recipe_id});

    if(recipeRating){
        res.status(200).json(recipeRating);
    }
    else{
        res.status(404);
        throw new Error("No Ratings Found for this recipe");
    }
    
});


// user cannot rate his recipe.. check that first.
// only one time a user can rate recipe.
const createRating = asyncHandler(async(req,res) =>{

    const userId = req.payload.userId;
    const recipeId = req.params.recipeId;

    const user_id = userId;

    const { recipe_id, value, description} = req.body;

    const recipe = await recipeModel.findById(recipe_id);

    console.log("recipe.user_id ===== ", recipe.user_id.toString());
    console.log("user_id ===== ", user_id);

    // if(recipe.user_id.toString() === user_id){
    //     res.status(400);
    //     throw new Error("User cannot rate their own recipe");
    // }

    const recipeRatingExist = await ratingModel.findOne({recipe_id, user_id});

    // if(recipeRatingExist){
    //     res.status(400);
    //     throw new Error("One rating per recipe");
    // }

    const Rating = await ratingModel.create({
        user_id,
        recipe_id,
        value,
        description
    });

    if(Rating){
        res.status(200).json(Rating);
    }
    else{
        res.status(400);
        throw new Error("Rating couldn't be saved");
    }

});

// check with JWT if there is a record where this user has given a rating
// check if the rating is the users rating.
// Check here is the Recipe.
const updateRating = asyncHandler(async(req,res) =>{

    const updatedRating = await RatingModel.findByIdAndUpdate(req.params.ratingId, { $set: req.body }, { new: true }) // true is to Return the updated document

    if(!updatedRating){   //checking the length of the array
        res.status(404);
        throw new Error("No users Found");
    }
    else{
        res.status(200).json(updatedRating);
    }
});

// Check if the rating is the users using the JWT
const deleteRating = asyncHandler(async(req,res) =>{
    
    const deletedRating = await RatingModel.findByIdAndDelete(req.params.ratingId);
    console.log("Delete ---===---", req.params.ratingId);

    if(!deletedRating){   //checking the length of the array
        res.status(404);
        throw new Error("No Rating Found");
    }
    else{
        res.status(200).json(deletedRating);
    }

});

module.exports = { getAllRating, getRating, createRating, updateRating, deleteRating};
// export