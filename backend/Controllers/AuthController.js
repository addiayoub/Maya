const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

const tokenExpiresIn = 60 * 60 * 24;

class _authController {
  async login(req, res) {
    try {
      let { username, password } = req.body;
      username = username.trim();
      if (!username || !password) {
        return res.status(400).json({
          message: "Veuillez fournir un nom d'utilisateur et un mot de passe.",
        });
      }

      // Finding a user
      const user = await User.findOne({ username }).select("+password");
      if (!user) {
        return res.status(400).json({
          message:
            "Utilisateur non trouvé. Veuillez vérifier le nom d'utilisateur.",
        });
      }

      // Check the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Mot de passe incorrect. Veuillez réessayer.",
        });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: tokenExpiresIn,
      });
      const { exp } = jwt.decode(token);
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: tokenExpiresIn * 1000,
      });
      return res.status(200).json({
        id: user._id,
        username,
        role: user.isAdmin ? 305 : 300,
        token,
        expiresIn: tokenExpiresIn,
        expiresAt: exp,
        image: user.image,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async logout(req, res) {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "logged out" });
  }
}

const authController = new _authController();
module.exports = authController;
