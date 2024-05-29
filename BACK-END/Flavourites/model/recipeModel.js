const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
    
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "userDetailSchema",  // foreign key
    },
    title:{
        type: String,
        required: [true, "Please Enter your recipe's Title"],
    },
    description:{
        type: String,
        required: [true, "Please Enter your recipe's Description"],
    },
    course:{
        type: String,
        required: [true, "Please Enter your recipe's course"],
    },
    cuisine:{
        type: String,
        required: [true, "Please Enter your recipe's cuisine"],
    },
    instructions:{
        type: String,
        // required: [true, "Please Enter your recipe's Instructions"],
    },
    prepTime:{
        type: Number,
        required: [true, "Please enter Preparation Time taken"],
    },
    imageUrl:{
        type: String,
        required: [true, "Please add your recipe image"],
    },

});

module.exports = mongoose.model("RecipeDetail",recipeSchema);