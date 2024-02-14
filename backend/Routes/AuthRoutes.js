const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");

// login
router.post("/login", authController.login);

//logoout
router.post("/logout", authController.logout);

module.exports = router;
