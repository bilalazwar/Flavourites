require("dotenv").config();
const express = require("express");
const router = express.Router();
const { createUserLogin, userLogin, updatePassword } = require("../controller/useLoginController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", createUserLogin);
router.post("/", userLogin);
router.put("/", validateToken, updatePassword);

module.exports = router;