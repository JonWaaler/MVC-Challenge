const router = require("express").Router();

// routes
const userRoute = require("./user-routes");

router.use("/users", userRoute);

module.exports = router;
