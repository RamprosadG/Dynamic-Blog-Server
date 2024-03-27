const express = require("express");
const cors = require("cors");
const corsOptions = require("./src/middlewares/corsMiddleware");
const adminRouter = require("./src/routes/adminRoute");
const userRouter = require("./src/routes/userRoute");
const authRouter = require("./src/routes/authRoute");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/", authRouter);

module.exports = app;
