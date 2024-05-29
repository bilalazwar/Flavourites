const mongoose = require("mongoose");

const userLoginSchema = mongoose.Schema({

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "userDetailSchema",  // foreign key
    },
    username:{
        type: String,
        unique: true,
        required: [true, "Please Enter your username"],
    },
    password:{
        type: String,
        required: [true, "Please Enter Password"],
    },
    userType:{
        type: String,
        required: [true, "User Type missing"],
    },
});

module.exports = mongoose.model("UserLogin",userLoginSchema);