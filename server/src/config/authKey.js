require("dotenv").config();

exports.userSecretKey = process.env.USER_SECRET_KEY;
exports.adminSecretKey = process.env.ADMIN_SECRET_KEY;

exports.allowedOrigins = ["http://localhost:5173"];
