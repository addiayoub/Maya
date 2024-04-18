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
      // unique: [
      //   true,
      //   "Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
      // ],
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "default-profile.jpg",
    },
    chats: [
      {
        title: {
          type: String,
        },
        isDeleted: { type: Boolean, default: false },
        messages: [
          {
            input: {
              type: Object,
              default: {},
            },
            output: {
              type: Object,
              default: {},
            },
            isDeleted: { type: Boolean, default: false },
            timestamp: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true, autoIndex: false }
);
// Define a compound index on 'username' and 'isDeleted'
// userSchema.index({ username: 1, isDeleted: 1 }, { unique: true });
userSchema.index(
  { username: 1 },
  {
    unique: [
      true,
      "Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
    ],

    partialFilterExpression: {
      isDeleted: false,
    },
  }
);
userSchema.pre("find", function () {
  this.where({ isDeleted: false });
});
userSchema.pre("findOne", function () {
  this.where({ isDeleted: false });
});
const User = mongoose.model("user", userSchema);

module.exports = User;
