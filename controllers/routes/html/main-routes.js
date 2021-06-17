const router = require("express").Router();
const { User } = require("../../../models");

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
          tempData: req.session.user_id,
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
        tempData: req.session.user_id,
      };
      res.render("dashboard", data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/session", (req, res) => {
  res.json(req.session);
});

module.exports = router;
