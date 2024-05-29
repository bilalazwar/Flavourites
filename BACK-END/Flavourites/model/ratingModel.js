const mongoose = require("mongoose");

const ratingModel = mongoose.Schema({
    
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "userDetailSchema",  // foreign key
    },
    recipe_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "recipeSchema",  // foreign key
    },
    value:{
        type: Number,
        required: [true, "Please Enter 1-5"],
    },
});

module.exports = mongoose.model("Ratings", ratingModel);