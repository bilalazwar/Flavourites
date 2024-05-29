require("dotenv").config();
const express = require("express");
const router = express.Router();
const { createUserLogin, userLogin } = require("../controller/useLoginController");

router.post("/register", createUserLogin);
router.post("/", userLogin);

module.exports = router;