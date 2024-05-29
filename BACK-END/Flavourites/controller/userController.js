const asyncHandler = require("express-async-handler");  // A middleware "npm install express-async-handler"
const User = require("../model/userModel");


// we need to have a errorhandler middleware implemented in ur project when using asyncHandler
// Then we don't need to write try catch boiler plate code to handle ERROR
// passes the error caught here to error handling-middleware.

const createUser = asyncHandler(async function(req,res){  // function without name

    const{name, email, profilePictureUrl, bio, location} = req.body;
    if(!name || !email || !bio){
        res.status(404);
        throw new Error("Please fill the mandatory fields");
    }

    const userAvailable = await User.findOne({ email });

    if(userAvailable){
        res.status(404);
        throw new Error(`User already registered with ${email}`);
    }
    else{
        const userSaved = await User.create({
            name,
            email,
            profilePictureUrl,
            bio,
            location
        });

        if(userSaved){
            res.status(200).json(userSaved);
        }
        else{
            res.status(400).json({message:"Error"});
        }
    }
});

const getAllUsers = asyncHandler(async (req,res) => {   // using arrow function

    const users = await User.find();

    if(users.length === 0){   //checking the length of the array
        res.status(404);
        throw new Error("No users Found");
    }
    else{
        res.status(200).json(users);
    }
});

const getUserById = asyncHandler(async (req,res) => {

    const user = await User.findById(req.params.id);

    if(!user){   //checking the length of the array
        res.status(404);
        throw new Error("No user Found");
    }
    else{
        res.status(200).json(user);
    }
});

// cant use , use some other url like /getUser/email
const getUserByEmail = asyncHandler(async (req,res) => {
    const users = await User.findOne({email: req.body.email});

    console.log(users);
    if(!users){   //checking the length of the array
        res.status(404);
        throw new Error("No users Found");
    }
    else{
        res.status(200).json(users);
    }
});

const getUsersByLocation = asyncHandler(async (req,res) => {
    const users = await User.find({location: req.params.location});

    console.log(users);
    if(users.length ===0 ){   //checking the length of the array
        res.status(404);
        throw new Error("No users Found");
    }
    else{
        res.status(200).json(users);
    }
});

const deleteUserById = asyncHandler(async (req,res) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){   //checking the length of the array
        res.status(404);
        throw new Error("No users Found");
    }
    else{
        res.status(200).json(user);
    }

});

const updateUserByID = asyncHandler(async (req,res) => {

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }) // true is to Return the updated document

    if(!updatedUser){   //checking the length of the array
        res.status(404);
        throw new Error("No users Found");
    }
    else{
        res.status(200).json(updatedUser);
    }
});


module.exports = {createUser, getAllUsers, getUserById, getUserByEmail, deleteUserById, updateUserByID, getUsersByLocation};