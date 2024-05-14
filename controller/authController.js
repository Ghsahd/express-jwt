const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const { where } = require("sequelize");
const User = require("../models").User;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(401).json({ message: "Invalid email" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        password: user.password,
      },
      JWT_SECRET,
      {
        expiresIn: "1min",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "internal server loginerror", error });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const getEmail = await User.findOne({ where: { email: email } });
    if (getEmail) {
      return res.status(401).json("email is ready");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        email: newUser.email,
        password: newUser.password,
      },
      JWT_SECRET,
      {
        expiresIn: "1min",
      }
    );
    res.status(200).json({ token, data: [username] });
  } catch (error) {
    res.status(500).json({ message: "internal server register error", error });
  }
};
