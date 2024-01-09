const express = require("express");

/* ------------------------------ ADMIN ROUTES{WEB} ------------------------------ */
const petRoute = require("./web/pet.route");
const sexualRoute = require("./web/sexual.route");
const signRoute = require("./web/sign.route");
const interestRoute = require("./web/interest.route");
const planRoute = require("./web/plan.route");
const adminRoute = require("./web/admin.route");
const router = express.Router();

router.use("/pet", petRoute);
router.use("/sexual", sexualRoute);
router.use("/sign", signRoute);
router.use("/interest", interestRoute);
router.use("/plan", planRoute);
router.use("/admin", adminRoute);
/* -------------------------------{APP} USER ROUTES ------------------------------ */
const userRoute = require("./app/user.route");
const listingRoute = require("./app/listing.route");
const likeRoute = require("./app/like.route");


router.use("/user", userRoute);
router.use("/list", listingRoute);
router.use("/like", likeRoute);


/* ------------------------------- Demo ROUTE ------------------------------- */
// const locationRoute=require("./location.route");
// const numberRoute = require("./number.route");
// // const apiRoute=require("./api.route");

// // const tokenRoute=require("./token.route");



// // router.use("/location",locationRoute);
// router.use("/numbers", numberRoute);
// // router.use("/api-create",apiRoute);
// router.use("/token",tokenRoute);

module.exports = router;
