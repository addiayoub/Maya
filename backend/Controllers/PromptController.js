const Prompt = require("../Models/PromptModel");

class _PromptController {
  async index(req, res) {
    try {
      const prompts = await Prompt.find().select("id title isDefault");
      return res.status(200).json({ prompts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async store(req, res) {
    try {
      const { title, isDefault } = req.body;
      const prompts = await Prompt.find().select("id title");
      const exists = prompts.find(
        (prompt) => prompt.title.toLowerCase() === title.toLowerCase()
      );
      if (!exists) {
        // Add Prompt to DB
        const savedPrompt = await Prompt.create({
          title,
          isDefault,
        });
        res.status(201).json({
          message: "Prompt ajouté avec succès.",
          prompt: { _id: savedPrompt._id, title: savedPrompt.title },
        });
      } else {
        res.status(400).json({
          message: "Le prompt existe déjà.",
          prompt: exists,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Une erreur est survenue lors de la création de prompt",
        error: error.message,
      });
    }
  }

  async storePrompts(req, res) {
    try {
      const { titles } = req.body;
      if (!Array.isArray(titles)) {
        return res
          .status(400)
          .json({ message: "Titles must be provided as an array." });
      }

      // Add Prompts to DB
      const savedPrompts = await Prompt.create(
        titles.map((title) => ({ title }))
      );

      res.status(201).json({
        message: "Prompts créés avec succès.",
        prompts: savedPrompts,
      });
    } catch (error) {
      res.status(500).json({
        message: "Une erreur est survenue lors de la création des prompts.",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.query;
      const prompt = await Prompt.findById(id);
      if (!prompt) {
        return res.status(404).json({ message: "Prompte non trouvée." });
      }

      // Mark prompt as deleted
      prompt.isDeleted = true;

      // Save the updated user document
      await prompt.save();
      res.status(200).json({
        message: "Prompt supprimée avec succès.",
        prompt,
      });
    } catch (error) {
      console.error("message:", error);
      res.status(500).json({ error });
    }
  }
  async deleteAll(req, res) {
    try {
      // Delete all prompts from the database
      await Prompt.deleteMany();

      res.status(200).json({ message: "All prompts deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
const promptController = new _PromptController();
module.exports = promptController;
