const jwt = require("jsonwebtoken");
const { userSecretKey, adminSecretKey } = require("../config/authKey");

exports.jwtUserAuthenticate = (req, res, next) => {
  const userToken = req.cookies.userToken;
  console.log(userToken);

  if (!userToken) {
    return res.json({ message: "Unauthorized", success: false });
  }

  try {
    const decoded = jwt.verify(token, userSecretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.json({ message: "Invalid token", success: false });
  }
};

exports.jwtAdminAuthenticate = (req, res, next) => {
  const { adminToken } = req.cookies;

  if (!adminToken) {
    return res.json({ message: "Unauthorized", success: false });
  }

  try {
    const decoded = jwt.verify(token, adminSecretKey);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.json({ message: "Invalid token", success: false });
  }
};
