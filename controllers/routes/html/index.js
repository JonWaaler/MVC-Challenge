const router = require("express").Router();

// routes
const mainRoute = require("./main-routes");
const authRoute = require("./auth-routes");

router.use("/", mainRoute);
router.use("/", authRoute);

module.exports = router;
