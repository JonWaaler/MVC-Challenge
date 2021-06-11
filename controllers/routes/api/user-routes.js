const router = require("express").Router();
const { User } = require("../../../models");

// GET all users
router.get("/", (req, res) => {
  User.findAll()
    .then((UserData) => res.json(UserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
});

module.exports = router;
