const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUserDB, getOneUserByEmailDB } = require("../models/userModel");
const { USER_SECRET_KEY, SMTP_SECRET_KEY } = require("../configs/config");
const sendNewsLetter = require("../utils/newsLetter");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await getOneUserByEmailDB(email);

  if (!user) {
    return res.json({
      message: "Invalid email or password.",
      success: false,
    });
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return res.json({
      message: "Invalid email or password.",
      success: false,
    });
  }

  const userInfo = {
    id: user.id,
    email: email,
    username: user.username,
    role: user.role,
  };

  const userToken = jwt.sign(userInfo, USER_SECRET_KEY);

  res.cookie("userToken", userToken);
  res.json({
    data: userInfo,
    message: "Logged in successfully.",
    success: true,
  });
};

const handleLogout = async (req, res) => {
  res.clearCookie("userToken");
  res.json({ message: "Logged out successfully", success: true });
};

const handleRegister = async (req, res) => {
  const { email, password, username } = req.body;

  const user = await getOneUserByEmailDB(email);

  if (user) {
    return res.json({ message: "Email already exists.", success: false });
  }

  const min = 100000;
  const max = 999999;
  const code = Math.floor(Math.random() * (max - min + 1)) + min;

  const tokenData = {
    email: email,
    username: username,
    password: password,
    code: code,
  };

  const token = jwt.sign(tokenData, SMTP_SECRET_KEY, { expiresIn: "30m" });

  const newsLetterData = {
    email: email,
    subject: "Email verification",
    message: `<p>Your varification code is: ${code}</p>`,
  };

  const result = await sendNewsLetter(newsLetterData);

  if (!result) {
    return res.json({ message: "Something went wrong.", success: false });
  }

  res.json({
    message: "Email sent successfully.",
    token: token,
    success: true,
  });
};

const verifyRegister = async (req, res) => {
  try {
    const token = req?.params?.token;

    if (!token) {
      return res.json({ message: "Token is requited.", success: false });
    }

    const { code } = req.body;

    const decode = jwt.verify(token, SMTP_SECRET_KEY);
    console.log("Error in decode: " + decode);

    if (!decode) {
      return res.json({ message: "Invalid token.", success: false });
    }

    const { password } = decode;

    if (decode.code !== code) {
      return res.json({ message: "Wrong code.", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createUserDB(decode, hashedPassword);

    if (!result) {
      return res.json({ message: "Something went wrong.", success: false });
    }

    res.json({ message: "Registered successfully.", success: true });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong", status: false });
  }
};

module.exports = {
  handleLogin,
  handleLogout,
  handleRegister,
  verifyRegister,
};
