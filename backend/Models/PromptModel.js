const mongoose = require("mongoose");
const promptSchem = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "le titre de prompt est obligatoire !"],
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

promptSchem.pre("find", function () {
  this.where({ isDeleted: false });
});
promptSchem.pre("findOne", function () {
  this.where({ isDeleted: false });
});

const Prompt = mongoose.model("prompt", promptSchem);
module.exports = Prompt;
