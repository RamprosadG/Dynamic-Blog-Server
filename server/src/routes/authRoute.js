const authRouter = require("express").Router();
const {
  handleLogin,
  handleRegister,
  getUserInfo,
} = require("../controllers/authController");
const userSchema = require("../schema/userSchema");
const validateRequest = require("../utils/zodValidation");

authRouter.post("/login", handleLogin);
authRouter.post("/register", validateRequest(userSchema), handleRegister);
authRouter.get("/user/:id", getUserInfo);

module.exports = authRouter;
