require("dotenv").config();
const express = require("express");
const router = express.Router();
const { createUserLogin, userLogin, updatePassword } = require("../controller/useLoginController");

router.post("/register", createUserLogin);
router.post("/", userLogin);
router.put("/", updatePassword);

module.exports = router;