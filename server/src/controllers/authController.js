const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { privateAccessKey } = require("../config/authKey");

const {
  findOneUserByemail,
  findOneUserByUserName,
  registerNewUser,
} = require("../models/userModel");

exports.handleLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.json({
      message: "Email and password are required.",
      success: false,
    });
  }
  const user = await findOneUserByemail(email);

  if (!user) {
    return res.json({ message: "Your email is incorrect.", success: false });
  }

  bcrypt.compare(password, user.password, async (err, isPasswordMatch) => {
    if (err) {
      return res.json({ message: "Error to compare hash.", success: false });
    }

    if (!isPasswordMatch) {
      return res.json({
        message: "Your password is incorrect.",
        success: false,
      });
    }

    const userInfo = {
      id: user.id,
      email: email,
      userName: user.username,
    };

    const token = jwt.sign(
      userInfo,
      privateAccessKey,
      {
        expiresIn: "30d",
      },
      (err, token) => {
        if (err) {
          return res.json({
            message: "Error to generate jwt.",
            success: false,
          });
        }
        res.json({
          token: "Bearer " + token,
          message: "You are logged in successfully.",
          success: true,
        });
      }
    );
  });
};

exports.handleRegister = async (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  if (!userName || !email || !password) {
    return res.json({ message: "Every field is required.", success: false });
  }
  const userByEmail = await findOneUserByemail(email);

  if (userByEmail) {
    return res.json({ message: "This email already exists.", success: false });
  }

  const userByUserName = await findOneUserByUserName(userName);

  if (userByUserName) {
    return res.json({
      message: "This user name already exists.",
      success: false,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await registerNewUser(req.body, hashedPassword);

  if (!result) {
    return res.json({ message: "Internal server error.", success: false });
  }
  res.json({ message: "You are registered successfully.", success: true });
};
