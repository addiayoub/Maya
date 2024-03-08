const express = require("express");
const router = express.Router();
const chatController = require("../Controllers/ChatController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

router.use(AuthMiddleware);
router.get("/", chatController.index);
router.get("/show", chatController.show);
router.get("/infinit", chatController.infinit);
router.post("/", chatController.create);
router.delete("/", chatController.delete);
router.put("/edit", chatController.edit);
router.post("/like_dislike", chatController.likeDislike);
router.delete("/delete_message", chatController.deleteMessage);

module.exports = router;
