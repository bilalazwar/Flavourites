const asyncHandler = require("express-async-handler");  // A middleware "npm install express-async-handler"
const User = require("../model/userModel");
const UserLogin = require("../model/userLoginModel");
const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");  // "npm install bcryptjs"
const jwt = require("jsonwebtoken");   // npm install jsonwebtoken

const createUserLogin = asyncHandler( async function(req,res){

    const {user_id, username, password, userType} = req.body;

    if (!mongoose.isValidObjectId(user_id)) {
        res.status(400);
        throw new Error("Invalid user_id format. Must be a valid ID");
    }

    if(!user_id || !username || !password || !userType){
       
        res.status(404);
        throw new Error("Mandatory fields missing");
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

        // const accessToken = jwt.sign({
        //     user:{                      // payload
        //         username: userLoginDatabase.username,
        //         id: userLoginDatabase.id,
        //     },
        // },
        // process.env.ACCESS_TOKEN,
        // {expiresIn: "5m"});

        // res.status(200).json({accessToken});
        
        // res.status(200).json({message:"successfully logged In"});   
        
        const payload = {
            username: userLoginDatabase.username,
            userLoginId: userLoginDatabase.id,
            userId: userLoginDatabase.user_id,
            // userIdForeignKey: userLoginDatabase.user_id
          };
        const secretKey = process.env.ACCESS_TOKEN;
        const expirationTime = '2m'
        
        const accessToken = jwt.sign(payload, secretKey, { expiresIn: expirationTime });
        
        return res.status(200).json({accessToken});

    }
    else{
        res.status(401);
        throw new Error("Email or Password is not valid");
    }
});

// const updatePassword1 = asyncHandler(async function(req,res){
//     const { username, password} = req.body;
//     const payloadUsername = req.payload.username;
//     const payloadId = req.payload.id;

//     // console.log("Payload username == ",req.payload.username);
//     // console.log("Request body username == ",username);

//     if(!username || !password){
//         res.status(404);
//         throw new Error("Mandatory fields missing");
//     }

//     if(payloadUsername === username){

//         const userLoginDatabase = await UserLogin.findOne({username});
//         const hashPassword = await bcryptjs.hash(password, 10);

//         if(userLoginDatabase){
//             const updatedUserLogin = await UserLogin.findByIdAndUpdate(userLoginDatabase.id, { $set: {password : hashPassword} }, { new: true }); // true is to Return the updated document
//             res.status(200).json(updatedUserLogin);
//         }
//         else{
//             res.status(401);
//             throw new Error("UserLogin with this username does not exist");
//         }
//     }
//     else{
//         res.status(401);
//         throw new Error("Token does not belong to this username");

//     }
// });

const updatePassword = asyncHandler(async function(req,res){

    const {username, password }= req.body;
    const JWTTokenUsername =  req.payload.username;

    if(!username || !password){
        console.log("Empty username and password");
    }

    if(JWTTokenUsername === username){
        
        const userLoginDatabase = await UserLogin.findOne({username: username});
        const hashPassword = await bcryptjs.hash(password, 10);

        if(userLoginDatabase){
            
            const updatedUserLogin = await UserLogin.findByIdAndUpdate(userLoginDatabase.id, { $set: {password : hashPassword} }, { new: true }); // true is to Return the updated document
            res.status(200).json(updatedUserLogin);
        }
        else
        {
            res.status(401);
            throw new Error("UserLogin with this username does not exist");
        }

        console.log("User ==== ",userLoginDatabase);

        // get from the top method and update
    }
    else{
        res.status(401);
        throw new Error("Token does not belong to this username");

    }

});




module.exports = { createUserLogin, userLogin, updatePassword };