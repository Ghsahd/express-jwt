const Post = require("../models").Post;

exports.create = async (req, res) => {
  try {
    const { title, article } = req.body;
    Post.create({
      title,
      article,
    });

    res.status(200).json({ message: "Succes add data post" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error : ", error });
  }
};
