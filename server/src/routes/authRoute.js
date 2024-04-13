const authRouter = require("express").Router();
const {
  handleLogin,
  handleRegister,
} = require("../controllers/authController");

authRouter.post("/login", handleLogin);
authRouter.post("/register", handleRegister);

module.exports = authRouter;
