const mongoose = require("mongoose");

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;

const messageSchema = new mongoose.Schema({
  input: {
    type: String,
  },
  output: {
    type: String,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  title: {
    type: String,
  },
  messages: [messageSchema],
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: [
        5,
        "Le nom d'utilisateur doit comporter au moins 5 caractères.",
      ],
      required: [true, "le nom d'utilisateur est obligatoire !"],
      unique: [
        true,
        "Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
      ],
      trim: true,
      match: [usernameRegex, "nom d'utilisateur invalide"],
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est obligatoire !"],
      select: false,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    chats: [
      {
        title: {
          type: String,
        },
        messages: [
          {
            isUser: {
              type: Boolean,
            },
            data: {
              type: Object,
              default: {},
            },
            timestamp: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
