const router = require("express").Router();
const apiRoute = require("./api");

router.use(apiRoute);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
