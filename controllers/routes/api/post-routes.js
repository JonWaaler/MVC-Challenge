const router = require("express").Router();
const { Post, User } = require("../../../models");
// Starts from api/users

// GET all posts
router.get("/", (req, res) => {
  Post.findAll()
    .then((UserData) => res.json(UserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
