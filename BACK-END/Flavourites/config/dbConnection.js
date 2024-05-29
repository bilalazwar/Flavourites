const mongoose = require('mongoose'); // npm install mongoose
require("dotenv").config();

const uri = "mongodb://localhost:27017/Flavourites";

const connectDb = async function() {
    try{
        await mongoose.connect(uri)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.error("Error connecting to MongoDB", err));

        console.log("Database Connected");
    }
    catch(error){
        console.log(error);
    }
};

module.exports = connectDb;