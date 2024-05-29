const asyncHandler = require("express-async-handler");  // A middleware "npm install express-async-handler"
const User = require("../model/userModel");
const UserLogin = require("../model/userLoginModel");
const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");  // "npm install bcryptjs"

const createUserLogin = asyncHandler( async function(req,res){

    const {user_id, username, password, userType} = req.body;

    if (!mongoose.isValidObjectId(user_id)) {
        res.status(400);
        throw new Error("Invalid user_id format. Must be a valid ID");
    }

    if(!user_id || !username || !password || !userType){
       
        res.status(404);
        throw new Error("Mandatory field missing");
    }

    const hashPassword = await bcryptjs.hash(password, 10); // second argument salt round

    const userExist = await User.findById(user_id);
    // console.log(userExist);

    if(userExist){

        const userLogin = await UserLogin.create({
            user_id, 
            username, 
            password: hashPassword,
            userType
        });

        if(!userLogin){
            res.status(404);
            throw new Error("Unable to create User Login");
        }
        else{
            res.status(200).json(userLogin);
        }
    }
    else if(!userExist){
        res.status(400);
        throw new Error(`No user Registered with this User ID ${user_id}`);
    }
});

const userLogin = asyncHandler( async (req,res) => {

    const { username, password} = req.body;

    if(!username || !password){
        res.status(404);
        throw new Error("Username/Password missing");
    }
    const userLoginDatabase = await UserLogin.findOne({username});
    console.log(userLoginDatabase);

    if(userLoginDatabase && (await bcryptjs.compare(password, userLoginDatabase.password))){
        
        res.status(200).json(userLoginDatabase);        
    }
    else{
        res.status(401);
        throw new Error("Email or Password is not valid");
    }
});




module.exports = { createUserLogin, userLogin };