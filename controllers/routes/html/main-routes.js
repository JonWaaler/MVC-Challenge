const router = require("express").Router();

const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

// Home page
router.get("", withAuth, (req, res) => {
  const data = {
    tempData: "home",
  };
  res.render("home", data);
});

// Dashboard
router.get("/dashboard", withAuth, (req, res) => {
  const data = {
    tempData: req.session.user_id,
  };
  res.render("dashboard", data);
});

module.exports = router;
