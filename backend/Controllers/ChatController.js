const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");

class _ChatController {
  async index(req, res) {
    try {
      const { user } = req;
      console.log(new Date());
      const currentUser = await User.findById(user._id);
      const chats = currentUser.chats
        .filter((chat) => !chat.isDeleted)
        .reverse();
      return res.json({ chats });
    } catch (error) {
      console.error("message:", error);
      res.status(500).json({ error });
    }
  }
  async create(req, res) {
    try {
      const { user } = req;
      const { title } = req.body;
      console.log(new Date());
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          $push: {
            chats: {
              title,
            },
          },
        },
        { new: true }
      );
      const lastChat = updatedUser.chats.slice(-1)[0];
      return res.json({ chatId: lastChat._id });
    } catch (error) {
      console.error("message:", error);
      res.status(500).json({ error });
    }
  }
  async show(req, res) {
    try {
      const { user } = req;
      const { id } = req.query;
      console.log(new Date());
      const currentUser = await User.findByIdAndUpdate(user._id);
      const chat = currentUser.chats.find((chat) => chat._id.toString() === id);
      // Filter out deleted messages
      const nonDeletedMessages = chat.messages.filter((msg) => !msg.isDeleted);
      // Update the chat with non-deleted messages
      chat.messages = nonDeletedMessages;
      return res.json({ chat });
    } catch (error) {
      console.error("message:", error);
      res.status(500).json({ error });
    }
  }
  async infinit(req, res) {
    try {
      const skip = req.body.skip ? Number(req.body.skip) : 0;
      const { user } = req;
      const LIMIT = 5;
      const currentUser = await User.findById(user._id).skip(skip).limit(LIMIT);
      const chats = currentUser.chats;
      return res.json({ chats });
    } catch (error) {
      console.error("message:", error);
      res.status(500).json({ error });
    }
  }
  async delete(req, res) {
    try {
      const { user } = req;
      const { id } = req.query;
      const currentUser = await User.findById(user._id);
      console.log(new Date());
      if (!currentUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
      // Assuming your chat ID is stored in the `id` variable
      const chatIndex = currentUser.chats.findIndex(
        (chat) => chat._id.toString() === id
      );

      if (chatIndex === -1) {
        return res.status(404).json({ message: "Chat non trouvé." });
      }

      // Use $pull to remove the chat from the array
      currentUser.chats[chatIndex].isDeleted = true;
      // currentUser.chats.splice(chatIndex, 1);
      console.log(
        "currentUser.chats.splice(chatIndex, 1)",
        currentUser.chats[chatIndex]
      );

      // Save the updated user document
      await currentUser.save();
      const chats = currentUser.chats
        .filter((chat) => !chat.isDeleted)
        .map((chat) => ({
          _id: chat._id,
          title: chat.title,
          messages: chat.messages,
        }));
      res.status(200).json({
        message: "Chat supprimé avec succès.",
        chats,
      });
    } catch (error) {
      console.error("message:", error);
      res.status(500).json({ error });
    }
  }
  async edit(req, res) {
    try {
      const { user } = req;
      const { id, newTitle } = req.body;
      console.log("edit chat id", id, req.body, new Date());
      const currentUser = await User.findById(user._id);
      if (!currentUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
      // Find the index of the chat in the user's chats array
      const chatIndex = currentUser.chats.findIndex((chat) => {
        return chat._id.toString() === id;
      });

      if (chatIndex === -1) {
        return res.status(404).json({ message: "Chat non trouvé." });
      }

      // Update the title of the chat
      currentUser.chats[chatIndex].title = newTitle;

      // Save the updated user document
      await currentUser.save();
      const chats = currentUser.chats
        .filter((chat) => !chat.isDeleted)
        .map((chat) => ({
          id: chat._id,
          title: chat.title,
        }))
        .reverse();
      res.status(200).json({
        message: "Titre du chat mis à jour avec succès.",
        chats,
      });
    } catch (error) {
      console.error("message:", error);
      res.status(500).json({ error });
    }
  }
  async likeDislike(req, res) {
    try {
      const { user } = req;
      const { chatId, msgId, value } = req.body;
      console.log(new Date());
      const currentUser = await User.findById(user._id);
      const chatIndex = currentUser.chats.findIndex((chat) => {
        return chat._id.toString() === chatId;
      });

      if (chatIndex === -1) {
        return res.status(404).json({ message: "Chat non trouvé." });
      }
      const message = currentUser.chats[chatIndex].messages.find(
        (msg) => msg._id.toString() === msgId
      );
      message.data = {
        ...message.data,
        likedByUser: message.data.likedByUser === value ? 0 : value,
      };
      await currentUser.save();
      console.log("chat id", chatId);
      return res.json({ chatId, message });
    } catch (error) {
      console.error("message:", error);
      res.status(500).json({ error });
    }
  }

  async deleteMessage(req, res) {
    try {
      const { user } = req;
      const { chatId, msgId } = req.query;
      console.log(new Date());
      console.log(`delete msg: ${chatId} - ${msgId}`);
      const currentUser = await User.findById(user._id);
      if (!currentUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
      // Assuming your chat ID is stored in the `id` variable
      const chatIndex = currentUser.chats.findIndex(
        (chat) => chat._id.toString() === chatId
      );

      if (chatIndex === -1) {
        return res.status(404).json({ message: "Chat non trouvé." });
      }

      const msgIndex = currentUser.chats[chatIndex].messages.findIndex(
        (msg) => msg._id.toString() === msgId
      );

      if (msgIndex === -1) {
        return res.status(404).json({ message: "Message non trouvé." });
      }
      // Mark the message as deleted
      currentUser.chats[chatIndex].messages[msgIndex].isDeleted = true;

      // Check if there is a preceding message
      if (msgIndex > 0) {
        // Delete the preceding message
        // Mark the message as deleted
        currentUser.chats[chatIndex].messages[msgIndex - 1].isDeleted = true;
      }

      // Save the updated user document
      await currentUser.save();
      res.status(200).json({
        message: "Message supprimé avec succès.",
        messages: currentUser.chats[chatIndex].messages.filter(
          (msg) => !msg.isDeleted
        ),
      });
    } catch (error) {
      console.error("message:", error);
      res.status(500).json({ error });
    }
  }
}
const chatController = new _ChatController();
module.exports = chatController;
