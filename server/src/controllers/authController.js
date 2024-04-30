const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getOneUserByEmailDB, createUserDB } = require("../models/userModel");
const { USER_SECRET_KEY } = require("../config/config");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await getOneUserByEmailDB(email);

  if (!user) {
    return res.json({
      message: "Your email or password is incorrect.",
      success: false,
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.json({
      message: "Your email or password is incorrect.",
      success: false,
    });
  }

  const userInfo = {
    id: user.id,
    email: email,
    userName: user.username,
  };

  const userToken = jwt.sign(userInfo, userSecretKey);

  res.cookie("userToken", userToken);
  res.json({
    data: userInfo,
    message: "You are successfully logged in.",
    success: true,
  });
};

const handleLogout = async (req, res) => {
  res.clearCookie("userToken");
  res.json({ message: "Logged out successfully", success: true });
};

const handleRegister = async (req, res) => {
  const { email, password } = req.body;

  const userByEmail = await getOneUserByEmailDB(email);

  if (userByEmail) {
    return res.json({ message: "This email already exists.", success: false });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await createUserDB(req.body, hashedPassword);

  if (!result) {
    return res.json({ message: "Internal server error.", success: false });
  }

  res.json({ message: "You are registered successfully.", success: true });
};

module.exports = {
  handleLogin,
  handleLogout,
  handleRegister,
};
