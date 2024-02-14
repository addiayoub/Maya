const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");
// Create User

router.use(AuthMiddleware);
router.post("/", userController.store);
router.post("/store_message", userController.storeMessage);

module.exports = router;
