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

// GET 1 post
router.get("/:id", (req, res) => {
  Post.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((UserData) => res.json(UserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST new post
router.post("/", (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Post.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No post found with that ID." });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a tag by its `id` value
router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((fcData) => {
      if (!fcData) {
        res.status(404).json({ message: "No post found by that ID." });
        return;
      }
      res.json(fcData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
