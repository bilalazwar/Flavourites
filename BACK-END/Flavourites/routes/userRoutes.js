require("dotenv").config();
const express = require("express");
const router = express.Router();
const {createUser, getAllUsers, getUserById, getUserByEmail, deleteUserById, updateUserByID, getUsersByLocation} = require("../controller/userController");


router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/:email", getUserByEmail);
router.get("/location/:location", getUsersByLocation);
router.delete("/:id", deleteUserById);
// router.delete("/:id", deleteUser);
// router.delete("/", deleteAllUser);
router.put("/:id", updateUserByID);


module.exports = router;

// for this add JWT Token and when the payload shows admin only display