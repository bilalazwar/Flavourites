const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema({
    
    recipe_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "recipeSchema",  // foreign key
    },
    name:{
        type: String,
        required: [true, "Please Enter your recipe's Title"],
    },
    quantity:{
        type: String,
        required: [true, "Please Enter your recipe's Description"],
    },
    unit:{
        type: String,
        required: [true, "Please Enter your recipe's course"],
    },
    notes:{
        type: String,
        // additional details.
    },

});

module.exports = mongoose.model("Ingredients",ingredientSchema);