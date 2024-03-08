const Config = require("../Models/ConfigModel");

class _ConfigController {
  async index(req, res) {
    try {
      const { apiAddress } = await Config.findOne();
      res.json({ apiAddress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async store(req, res) {
    try {
      const { apiAddress } = req.body;
      // Ensure the API address is provided
      if (!apiAddress) {
        return res.status(400).json({ message: "L'adresse API est requise" });
      }

      // Find or create a configuration document and update the API address
      const config = await Config.findOneAndUpdate(
        {},
        { apiAddress },
        { new: true, upsert: true }
      );

      res.json({
        apiAddress: config.apiAddress,
        message: "L'adresse API a été mise à jour avec succès",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

const configController = new _ConfigController();
module.exports = configController;
