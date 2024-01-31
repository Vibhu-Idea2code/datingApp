const express = require("express");

/* ------------------------------ ADMIN ROUTES{WEB} ------------------------------ */
const petRoute = require("./web/pet.route");
const sexualRoute = require("./web/sexual.route");
const signRoute = require("./web/sign.route");
const interestRoute = require("./web/interest.route");
const planRoute = require("./web/plan.route");
const adminRoute = require("./web/admin.route");
const notificationRoute = require("./web/notification.route");
const dashboardRoute = require("./web/dashboard.route");
const countryCodeRoute = require("./web/countryCode.route");


const router = express.Router();

router.use("/pet", petRoute);
router.use("/sexual", sexualRoute);
router.use("/sign", signRoute);
router.use("/interest", interestRoute);
router.use("/plan", planRoute);
router.use("/admin", adminRoute);
router.use("/notification", notificationRoute);
router.use("/dashboard", dashboardRoute);
router.use("/countryCode", countryCodeRoute);


/* -------------------------------{APP} USER ROUTES ------------------------------ */
const userRoute = require("./app/user.route");
const listingRoute = require("./app/listing.route");
const likeRoute = require("./app/like.route");
const subRoute = require("./web/subscription.route");
const reportRoute = require("./app/report.route");
const boostRoute = require("./app/boost.route");
const purchasePlanRoute = require("./app/purchasePlan.route");



router.use("/user", userRoute);
router.use("/list", listingRoute);
router.use("/like", likeRoute);
router.use("/sub", subRoute);
router.use("/report", reportRoute);
router.use("/boost", boostRoute);
router.use("/purchaseplan", purchasePlanRoute);






/* ------------------------------- Demo ROUTE ------------------------------- */
// const locationRoute=require("./location.route");
// const numberRoute = require("./number.route");
// // const apiRoute=require("./api.route");
// // const tokenRoute=require("./token.route");
// const superlikeRoute = require("./app/superLike.route");



// router.use("/superlike", superlikeRoute);
// // router.use("/location",locationRoute);
// router.use("/numbers", numberRoute);
// // router.use("/api-create",apiRoute);
// router.use("/token",tokenRoute);

module.exports = router;
