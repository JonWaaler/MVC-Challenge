const router = require("express").Router();

// Home page
router.get("", (req, res) => {
  const data = {
    tempData: "home",
  };
  res.render("home", data);
});

// Dashboard
router.get("/dashboard", (req, res) => {
  const data = {
    tempData: "dashboard",
  };
  res.render("dashboard", data);
});

module.exports = router;
