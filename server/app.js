const express = require("express");
const route = require("./src/routes/route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);

module.exports = app;
