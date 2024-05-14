const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(500).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.email = decoded.email;
    console.log(req.email);
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid token jwt", error });
  }
};

module.exports = authentication;
