const router = require("express").Router();

// login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    console.log("You are logged in...");
    res.redirect("/");
    return;
  }

  const data = {
    tempData: "login",
  };
  res.render("login", data);
});

// logout page
router.get("/logout", (req, res) => {
  const data = {
    tempData: "logout",
  };
  res.render("login", data);
});

module.exports = router;
