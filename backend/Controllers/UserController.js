const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const statsPipelines = require("../utils/statsPipelines");
class _UserController {
  async index(req, res) {
    try {
      const loggedInUserId = req.user._id;

      const users = await User.find({
        _id: { $ne: loggedInUserId },
      }).sort({
        createdAt: -1,
      });
      return res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getStats(req, res) {
    try {
      const [
        messagesResult,
        chatsResult,
        deletedMessagesByUser,
        deletedChatsByUser,
        messageReactions,
        messageReactionsByUser,
        deletedUsersRes,
        totalMessagesRes,
        totalChatsRes,
        messagesByUser,
        chatsByUser,
      ] = await Promise.all([
        User.aggregate(statsPipelines.deletedMessages),
        User.aggregate(statsPipelines.deletedChats),
        User.aggregate(statsPipelines.deletedMessagesByUser),
        User.aggregate(statsPipelines.deletedChatsByUser),
        User.aggregate(statsPipelines.messageReactions),
        User.aggregate(statsPipelines.messageReactionsByUser),
        User.aggregate(statsPipelines.deletedUsers),
        User.aggregate(statsPipelines.totalMessages),
        User.aggregate(statsPipelines.totalChats),
        User.aggregate(statsPipelines.messagesByUser),
        User.aggregate(statsPipelines.chatsByUser),
      ]);

      const stats = {
        deletedMessages: messagesResult[0]?.deletedMessages || 0,
        deletedChats: chatsResult[0]?.deletedChats || 0,
        deletedMessagesByUser,
        deletedChatsByUser,
        messageReactions: messageReactions[0],
        messageReactionsByUser,
        deletedUsers: deletedUsersRes[0]?.deletedUsers || 0,
        totalMessages: totalMessagesRes[0]?.totalMessages || 0,
        totalChats: totalChatsRes[0]?.totalChats || 0,
        messagesByUser,
        chatsByUser,
      };
      return res.status(200).json({ stats });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.query;
      const exists = await User.findById(id);
      if (!exists) {
        return res.status(409).json({
          message: "Utilisateur non trouvé.",
        });
      }
      // await User.deleteOne({ _id: id });
      exists.isDeleted = true;
      exists.save();
      return res
        .status(200)
        .json({ message: "L'utilisateur a été supprimé avec succès." });
    } catch (error) {
      return res.status(500).json({ message: "Network Error" });
    }
  }

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

  async update(req, res) {
    try {
      const { id } = req.query;
      const { username, password, passwordConfirmation, isAdmin } = req.body;
      // return res.json({ username, password, passwordConfirmation, isAdmin });
      const user = await User.findById(id);
      const user2 = await User.findOne({ username, isDeleted: false });
      if (user2) {
        if (user2.id != user.id) {
          return res.status(400).json({
            message: {
              username:
                "Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
            },
          });
        }
      }
      user.username = username.toLowerCase();
      user.isAdmin = isAdmin;
      if (password || passwordConfirmation) {
        if (password !== passwordConfirmation) {
          return res.status(400).json({
            message: { password: "Les mots de passes ne s'accords pas !" },
          });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
      }
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

      user.save();
      res.status(201).send({
        message: "L'utilisateur a été mis à jour avec succès.",
        user,
      });
    } catch {
      res.status(500).json({
        error: "Une erreur s'est produite lors du traitement de la requête.",
      });
    }
  }
  async storeMessage(req, res) {
    const { userInput, aiResponse } = req.body;
    const { chatId } = req.query;
    const { user } = req;
    const loggedInUser = await User.findById(user._id);
    const input = {
      content: userInput,
    };
    const output = {
      content: aiResponse.message,
      execution_time: aiResponse.execution_time_seconds,
      base64Image: aiResponse.image_data ?? null,
      chartData: aiResponse.csv_data,
      chartType: aiResponse.visualization_type,
      likedByUser: 0,
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
    chat.messages.push({
      input,
      output,
    });
    await loggedInUser.save();
    const lastMessageId = chat.messages[chat.messages.length - 1]._id;
    res.status(200).json({
      success: true,
      chat,
      loggedInUser,
      msgId: lastMessageId,
    });
  }

  async updateProfile(req, res) {
    const { username, password, passwordConfirmation } = req.body;
    const { user } = req;
    // console.log("file", req);
    const currentUser = await User.findById(user._id);
    let newInfos = { username };

    if (req.file) {
      newInfos.image = req.file.filename;
    }
    // currentUser.save();
    const exists = await User.findOne({
      username,
      isDeleted: false,
      _id: { $ne: user._id },
    });

    if (exists) {
      return res.status(400).json({
        message: {
          username:
            "Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
        },
      });
    }

    currentUser.username = username.toLowerCase();

    if (password || passwordConfirmation) {
      if (password !== passwordConfirmation) {
        return res.status(400).json({
          message: { password: "Les mots de passes ne s'accords pas !" },
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      newInfos.password = hashedPassword;
    }

    // Validate user schema
    const validationError = currentUser.validateSync();
    if (validationError) {
      const { errors } = validationError;
      const formattedErrors = {};
      Object.keys(errors).forEach((key) => {
        formattedErrors[key] = errors[key].message;
      });
      return res.status(400).json({ message: formattedErrors });
    }
    const newUser = await User.findByIdAndUpdate(
      user._id,
      { $set: newInfos },
      { new: true }
    );
    return res.status(201).send({
      message: "Vos informations ont été mises à jour avec succès",
      user: newUser,
    });
  }
}
const userController = new _UserController();
module.exports = userController;
