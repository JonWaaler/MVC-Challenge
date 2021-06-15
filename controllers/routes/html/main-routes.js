const router = require("express").Router();

const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

// Home page
router.get("", (req, res) => {
  const data = {
    loggedIn: req.session.loggedIn,
    tempData: "home",
  };
  res.render("home", data);
});

// Dashboard
router.get("/dashboard", withAuth, (req, res) => {
  const data = {
    loggedIn: req.session.loggedIn,
    tempData: req.session.user_id,
  };
  res.render("dashboard", data);
});

router.get("/session", (req, res) => {
  res.json(req.session);
});

module.exports = router;
