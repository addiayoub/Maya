const express = require("express");
const router = express.Router();
const prompController = require("../Controllers/PromptController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

router.use(AuthMiddleware);
router.get("/", prompController.index);
router.post("/", prompController.store);
router.post("/storePrompts", prompController.storePrompts);
router.delete("/all", prompController.deleteAll);
router.delete("/", prompController.delete);
module.exports = router;
