const express = require("express");
const cors = require("cors");
const route = require("./src/routes/route");
const corsOptions = require("./src/middlewares/corsMiddleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(route);

module.exports = app;
