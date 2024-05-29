const asyncHandler = require("express-async-handler");  // A middleware "npm install express-async-handler"
const User = require("../model/userModel");


const createRecipe = asyncHandler(async function(req,res){

});


const updateRecipe = asyncHandler(async (req,res)=>{

});


const deleteRecipe = asyncHandler(async function(req,res){

});








module.exports = { createRecipe, updateRecipe, deleteRecipe };