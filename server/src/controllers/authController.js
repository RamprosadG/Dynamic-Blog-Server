const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUserDB,
  getOneUserByEmailDB,
  getOneUserByUsernameDB,
} = require("../services/userService");
const { USER_SECRET_KEY, SMTP_SECRET_KEY } = require("../configs/config");
const sendNewsLetter = require("../utils/newsLetter");
const getVerificationCode = require("../utils/generateVerificationCode");
const { faDownLong } = require("@fortawesome/free-solid-svg-icons");

const handleLogin = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
    res.json({
      message: "Something went wrong.",
      success: false,
    });
  }
};

const handleLogout = async (req, res) => {
  res.clearCookie("userToken");
  res.json({ message: "Logged out successfully", success: true });
};

const handleRegister = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const userByUsername = await getOneUserByUsernameDB(username);

    if (userByUsername) {
      return res.json({ message: "Username already exists.", success: false });
    }
    const userByEmail = await getOneUserByEmailDB(email);

    if (userByEmail) {
      return res.json({ message: "Email already exists.", success: false });
    }

    const verificationCode = getVerificationCode();

    const tokenData = {
      email: email,
      username: username,
      password: password,
      verificationCode: verificationCode,
    };

    const token = jwt.sign(tokenData, SMTP_SECRET_KEY, { expiresIn: "1h" });

    const newsLetterData = {
      email: email,
      subject: "Email verification",
      message: `<p>Your varification code is: ${verificationCode}</p>`,
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
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong.", success: false });
  }
};

const verifyRegister = async (req, res) => {
  try {
    const token = req.params.token;
    console.log(req.params);
    console.log(token);

    if (!token) {
      return res.json({ message: "Token is requited.", success: false });
    }

    const { verificationCode } = req.body;
    console.log(verificationCode);

    const decode = jwt.verify(token, SMTP_SECRET_KEY);
    console.log(decode);

    if (!decode) {
      return res.json({ message: "Invalid token.", success: false });
    }

    const { password } = decode;
    console.log(decode, verificationCode);

    if (decode.verificationCode !== verificationCode) {
      return res.json({ message: "Wrong code.", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      username: decode.username,
      email: decode.email,
      password: hashedPassword,
    };
    console.log(userData);
    const result = await createUserDB(userData);

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
