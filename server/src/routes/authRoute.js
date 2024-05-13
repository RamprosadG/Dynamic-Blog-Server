const {
  handleLogin,
  handleRegister,
  verifyRegister,
} = require("../controllers/authController");
const createUserSchema = require("../schema/userSchema");
const validateRequest = require("../utils/zodValidation");
const authRouter = require("express").Router();

authRouter.post("/login", handleLogin);
authRouter.post("/register", validateRequest(createUserSchema), handleRegister);
authRouter.post("/verify/:token", verifyRegister);

module.exports = authRouter;
