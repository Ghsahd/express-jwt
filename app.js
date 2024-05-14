const express = require("express");
const app = express();
const port = 3000;

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const authentication = require("./middleware/auth");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/post", authentication, postRoutes);

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
