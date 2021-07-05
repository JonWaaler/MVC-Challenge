const router = require("express").Router();
const { User, Post } = require("../../../models");

const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

// Home page
router.get("", (req, res) => {
  if (req.session.loggedIn) {
    User.findOne({
      where: {
        id: req.session.user_id,
      },
      // Later on include ALL post
    })
      .then((userData) => {
        const data = {
          loggedIn: req.session.loggedIn,
          username: userData.username,
        };
        res.render("home", data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    const data = {
      loggedIn: false,
    };
    res.render("home", data);
  }
});

// Dashboard
router.get("/dashboard", withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    // Later on include JUST users posts
  })
    .then((userData) => {
      const data = {
        loggedIn: req.session.loggedIn,
        username: userData.username,
      };
      res.render("dashboard", data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// view/expanding a post to read the full thread
router.get("/post/:id", (req, res) => {
  // Check if user is logged in
  if (req.session.loggedIn) {
    User.findOne({
      where: {
        id: req.session.user_id,
      },
      // Later on include ALL post
    })
      .then((userData) => {
        Post.findOne({
          where: {
            id: req.params.id,
          },
        }).then((postData) => {
          const data = {
            loggedIn: req.session.loggedIn,
            username: userData.username,
            post: postData,
            isPoster: false,
          };

          // Check if the logged in user created the post
          if (postData.userId == userData.id) {
            data.isPoster = true;
          }
          res.render("post", data);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
  // User is not logged in so dont show any user profile stuff
  else {
    Post.findOne({
      where: {
        id: req.params.id,
      },
    }).then((postData) => {
      User.findOne({
        where: {
          id: postData.userId,
        },
      }).then((userData) => {
        const data = {
          loggedIn: false,
          post: postData,
          username: userData.username,
          isPoster: false,
        };

        res.render("post", data);
      });
    });
  }
});

router.get("/session", (req, res) => {
  res.json(req.session);
});

module.exports = router;
