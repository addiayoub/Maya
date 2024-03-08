const express = require("express");
const router = express.Router();
const configController = require("../Controllers/ConfigController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

router.use(AuthMiddleware);
router.get("/", configController.index);
router.post("/", configController.store);

module.exports = router;
