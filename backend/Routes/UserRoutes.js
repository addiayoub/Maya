const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/images")) {
      fs.mkdirSync("public/images");
    }

    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const fileName = path.parse(file.originalname).name;
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.use(AuthMiddleware);
// Create User
router.get("/", userController.index);
router.delete("/", userController.delete);
router.post("/", userController.store);
router.put("/", userController.update);
router.post("/store_message", userController.storeMessage);
router.post(
  "/update_profile",
  upload.single("image"),
  userController.updateProfile
);

module.exports = router;
