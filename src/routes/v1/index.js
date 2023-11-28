const express = require("express");
const userRoute = require("./user.route");
// const locationRoute=require("./location.route");
const numberRoute=require("./number.route");
const petRoute=require("./pet.route");
const sexualRoute=require("./sexual.route");
const signRoute=require("./sign.route");
const interestRoute=require("./interest.route");
const listingRoute=require("./listing.route");
// const apiRoute=require("./api.route");






const router = express.Router();
router.use("/user", userRoute);
// router.use("/location",locationRoute);
router.use("/numbers",numberRoute);
router.use("/pet",petRoute);
router.use("/sexual",sexualRoute);
router.use("/sign",signRoute);
router.use("/interest",interestRoute);
router.use("/list",listingRoute);
// router.use("/api-create",apiRoute);







module.exports = router;