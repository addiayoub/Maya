const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const AuthMiddleware = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id);
      next();
    } catch (error) {
      res.status(401).json({ message: "Token invalide" });
    }
  } else {
    res.status(401).json({ message: "Aucun token fourni" });
  }
};

module.exports = AuthMiddleware;
