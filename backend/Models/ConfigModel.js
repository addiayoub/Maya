const mongoose = require("mongoose");
const configSchema = new mongoose.Schema(
  {
    apiAddress: {
      type: String,
      required: [true, "L'adresse API est obligatoire !"],
    },
  },
  { timestamps: true }
);

const Config = mongoose.model("config", configSchema);

module.exports = Config;
