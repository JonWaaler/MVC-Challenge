const router = require("express").Router();

// routes
const mainRoute = require("./main-routes");

router.use("/", mainRoute);

module.exports = router;
