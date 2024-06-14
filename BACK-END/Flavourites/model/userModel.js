const mongoose = require("mongoose");

const userDetailSchema = mongoose.Schema({

    name:{
        type: String,
        required: [true, "Please add Your name"],
    },
    email:{
        type: String,
        required: [true, "Please Enter Your Email Address"],
        // unique: [true, "Email Address already taken"],
        validate: {
            validator: (email) => email.toLowerCase().endsWith("@gmail.com"),
            message: "Please enter a Gmail address (@gmail.com)"
        }
    },
    profilePictureUrl:{
        type: String,
        // validate: {
        //     validator: should Start with AWS bucket URL,
        //     message: "Invalid URL"
        // }
    },
    bio:{
        type: String,
        required: true,
    },
    location:{
        type: String,
    }
    
}, {
    timestamps : true,  // automatically add two additional fields to your documents in your MongoDB collection:
});

module.exports = mongoose.model('UserDetail', userDetailSchema);

// First argument  -: Then name of the model as String.
//                    This name will be used to create a collection in your MongoDB database and is often capitalized (e.g., User, Product).
//                    Mongoose will automatically create a plural version of this name (lowercase) for the underlying MongoDB collection

// Second argument -: A Mongoose Schema object.
//                    This object defines the structure and validation rules for your documents (data entries) in the corresponding collection.
//                    It's a JavaScript object that specifies the properties (fields) of each document and their data types, validation rules, and other options.