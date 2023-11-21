const express = require("express");
const userRoute = require("./user.route");
// const noteRoute=require("./note.route")
const router = express.Router();
router.use("/user", userRoute);
// router.use("/note",noteRoute);
module.exports = router;