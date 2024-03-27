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
    res.json({ message: "Email and password are required." });
    return;
  }
  const user = await findOneUserByemail(email);

  if (!user) {
    res.json({ message: "Your email is incorrect." });
    return;
  }

  bcrypt.compare(password, user.password, async (err, isPasswordMatch) => {
    if (err) {
      return res.json({ message: "Error to compare hash." });
    }

    if (!isPasswordMatch) {
      return res.json({ message: "Your password is incorrect." });
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
          return res.json({ message: "Error to generate jwt." });
        }
        res.json({
          token: "Bearer " + token,
          message: "You are logged in successfully.",
        });
      }
    );
  });
};

exports.handleRegister = async (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  if (!userName || !email || !password || !firstName || !lastName) {
    res.json({ message: "Every field is required." });
    return;
  }
  const userByEmail = await findOneUserByemail(email);

  if (userByEmail) {
    res.json({ message: "This email already exists." });
    return;
  }

  const userByUserName = await findOneUserByUserName(userName);

  if (userByUserName) {
    res.json({ message: "This user name already exists." });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await registerNewUser(req.body, hashedPassword);

  if (!result) {
    res.json({ message: "Internal server error." });
    return;
  }
  res.json({ message: "You are registered successfully." });
};
