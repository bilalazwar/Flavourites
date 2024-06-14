const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");   // npm install jsonwebtoken
require("dotenv").config();

const validateToken = asyncHandler((req, res, next) => {

    let token;
    let authHeader = req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer ")){
        token = authHeader.split(" ")[1]; // when you split from the space . 1st will be the "Bearer " and the 2nd will be the Token

        jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
            
            if(error){
                if (error.name === 'TokenExpiredError') {
                    console.error('Token expired');
                    res.status(401).json({ message: "Token expired. Please login again." });
                } 
                else {
                    console.error('Error validating token:', error.message);
                    res.status(401).json({ message: "Invalid token or User is not authorized" });
                }
            }
            console.log(decoded);
            const payload=decoded;
            req.payload= decoded;
            console.log(payload.username);
        });
        next();
    }
    if(!token){
        res.status(401);
        throw new Error("User is not authorized or the Token is missing");
    }
});

module.exports = validateToken;