const express = require("express");
const cors = require("cors");
const corsOptions = require("./src/middlewares/corsMiddleware");
const cookieParser = require("cookie-parser");
const router = require("./src/routes/route");
const GlobalError = require("./src/middlewares/globalErrorMiddleware");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(GlobalError);
app.use("/api", router);

module.exports = app;
