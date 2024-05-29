const express = require("express");  // npm install express
require("dotenv").config();    // npm install dotenv
const connectDb = require("./config/dbConnection");
const errorHandler = require('./middleware/errorHandler');  // custom error handling middleware.
// raw error details in html format is displayed as default.

connectDb();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());  // A middleware provided to convert incoming JSON data (often sent from client-side applications) into a format (JavaScript object) that your Node.js code can easily understand and work with. 

app.use("/users", require("./routes/userRoutes"));
app.use("/recipe", require("./routes/recipeRoutes"));
app.use("/login", require("./routes/userLoginRoutes"))

app.use(errorHandler);  // have to add at the end.

app.listen(port);
// app.listen(port,() =>{
//     console.log(`App Listening on ${port}`);
// });