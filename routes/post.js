const express = require("express");
const app = express();
const postController = require("../controller/postController");

app.get("/", (req, res) => {
  res.send("List todo");
});

app.post("/add", postController.create);

module.exports = app;
