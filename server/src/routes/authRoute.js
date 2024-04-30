const {
  handleLogin,
  handleRegister,
} = require("../controllers/authController");
const userSchema = require("../schema/userSchema");
const validateRequest = require("../utils/zodValidation");
const authRouter = require("express").Router();

authRouter.post("/login", handleLogin);
authRouter.post("/register", validateRequest(userSchema), handleRegister);

module.exports = authRouter;
