const express = require("express");
const app = express();
const authController = require("../controller/authController");

app.post("/login", authController.login);
app.post("/register", authController.register);

module.exports = app;
