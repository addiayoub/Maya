const User = require("../Models/UserModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { BSON } = require("mongodb");

class _UserController {
  async store(req, res) {
    try {
      const { username, password, passwordConfirmation, isAdmin } = req.body;
      if (!username && !password) {
        return res.status(400).json({
          message: {
            usernamePassword:
              "Veuillez fournir un nom d'utilisateur et un mot de passe.",
          },
        });
      }

      if (!username && password) {
        return res.status(400).json({
          message: {
            username: "Veuillez fournir un nom d'utilisateur.",
          },
        });
      }

      if (username && !password) {
        return res.status(400).json({
          message: {
            password: "Veuillez fournir un mot de pass.",
          },
        });
      }

      // Check if the username already in use
      const exists = await User.findOne({ username: username.toLowerCase() });
      if (exists) {
        return res.status(409).json({
          message: {
            username: "Un utilisateur avec ce nom d'utilisateur existe déjà.",
          },
        });
      }

      if (password !== passwordConfirmation) {
        return res.status(400).json({
          message: { password: "Les mots de passes ne s'accords pas !" },
        });
      }
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({
        username: username.toLowerCase(),
        password: hashedPassword,
        isAdmin,
      });

      // Validate user schema
      const validationError = user.validateSync();
      if (validationError) {
        const { errors } = validationError;
        const formattedErrors = {};
        Object.keys(errors).forEach((key) => {
          formattedErrors[key] = errors[key].message;
        });
        return res.status(400).json({ message: formattedErrors });
      }

      // Add the user to DB
      const savedUser = await User.create({
        username: username.toLowerCase(),
        password: hashedPassword,
        isAdmin,
      });

      res.status(201).json({
        message: "Utilisateur créé avec succès.",
        user: savedUser,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Une erreur est survenue lors de la création de l'utilisateur.",
        error: error.message,
      });
    }
  }

  async storeMessage(req, res) {
    const { userInput, aiResponse } = req.body;
    const { chatId } = req.query;
    const { user } = req;
    const loggedInUser = await User.findById(user._id);
    const userMsg = {
      isUser: true,
      data: {
        content: userInput,
      },
    };
    const aiMsg = {
      isUser: false,
      data: {
        content: aiResponse.message,
        execution_time: aiResponse.execution_time_seconds,
        base64Image: aiResponse.image_data ?? null,
        chartData: aiResponse.csv_data,
        chartType: aiResponse.visualization_type,
        likedByUser: 0,
      },
    };
    console.log("chatId", chatId);
    // Find the chat by its ID
    const chat = loggedInUser.chats.find(
      (chat) => chat._id.toString() == chatId
    );
    console.log("chat is:", new Date());

    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found." });
    }
    chat.messages.push(userMsg, aiMsg);
    await loggedInUser.save();
    const lastMessageId = chat.messages[chat.messages.length - 1]._id;
    res.status(200).json({
      success: true,
      chat,
      loggedInUser,
      msgId: lastMessageId,
    });
  }

  async upload(req, res) {
    console.log("Upload", req.file);
    return res.json({ res: true });
  }

  async updateProfile(req, res) {
    const { username, password, passwordConfirmation } = req.body;
    const { user } = req;
    // console.log("req.file", req.file);
    // console.log("file", req);
    // const currentUser = await User.findById(user._id);
    // let newInfos = { username };
    // const exists = await User.findOne({ username, _id: { $ne: user._id } });

    // if (exists) {
    //   return res.status(400).json({
    //     message: {
    //       username:
    //         "Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
    //     },
    //   });
    // }

    // currentUser.username = username.toLowerCase();

    // if (password || passwordConfirmation) {
    //   if (password !== passwordConfirmation) {
    //     return res.status(400).json({
    //       message: { password: "Les mots de passes ne s'accords pas !" },
    //     });
    //   }

    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(password, salt);
    //   user.password = hashedPassword;
    //   newInfos.password = hashedPassword;
    // }
    // // Validate user schema
    // const validationError = user.validateSync();
    // if (validationError) {
    //   const { errors } = validationError;
    //   const formattedErrors = {};
    //   Object.keys(errors).forEach((key) => {
    //     formattedErrors[key] = errors[key].message;
    //   });
    //   return res.status(400).json({ message: formattedErrors });
    // }
    // const newUser = await User.findByIdAndUpdate(
    //   user._id,
    //   { $set: newInfos },
    //   { new: true }
    // );
    // res.status(201).send({
    //   message: "Vos informations ont été mises à jour avec succès",
    //   newUser,
    // });
    return res.status(200).json({ message: "done", body: req.body });
  }
}
const userController = new _UserController();
module.exports = userController;
