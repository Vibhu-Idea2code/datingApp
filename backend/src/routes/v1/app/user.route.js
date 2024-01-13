const express = require("express");
const {
  userController,
  authController,
  UpdateController,
} = require("../../../controllers");
const { refreshToken, accessToken } = require("../../../middlewares/auth");
const { upload } = require("../../../middlewares/upload");
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                AUTH ROUTE                                */
/* -------------------------------------------------------------------------- */

/* -------------------------- register/signUp/create user -------------------------- */
router.post("/create-user", upload.array("user_img"), authController.register);

/* ---------------------------- LOGIN/SIGNIN USER --------------------------- */
router.post("/login", authController.loginEmail);
router.post("/login-phone", authController.checkUserPh);

/* ------------------------------- VERIFY OTP ------------------------------- */
router.post("/verify-otp", authController.verifyOtp);
// router.post("/verifyOtp", authController.verifyOtp);

router.get("/like/:userId", userController.getLikesByUserId);
/* -------------------------------------------------------------------------- */
/*                                    USER ROUTE                                    */
/* -------------------------------------------------------------------------- */

/* ------------------------------- get user list ------------------------------------------- */

router.get("/role", accessToken(), userController.getAllUser); // admin side (all user list)
router.get("/role-list", accessToken(), userController.getUserListRole); // ROLE WISE
router.get("/list",
// accessToken(),
 userController.userList); // HOME PAGE (DISTANCE,USERID,FIRSTNAME)

/* ----------------------------- get user by id ----------------------------- */
router.get("/getid-user/:userId", userController.getUserDetails); // HOME PAGE (DISTANCE,USERID,FIRSTNAME) USING USER ID
router.get("/getid-user-all/:userId", userController.getUserDetailsAll); //HOME PAGE (FULLY DETAILS) USING USER ID
router.get("/getid-user-all-latlong/:userId", userController.getUserLatLong); //HOME PAGE (FULLY DETAILS) USING USER ID

//  /* ---------------------------- delete user list ---------------------------- */
router.delete("/delete-user/:userId", userController.deleteUser);
router.delete("/delete-many", userController.deleteManyUsers);

// /* ------------------------- update user info ------------------------ */
// router.put("/update/:userId", userController.updateDetails);
router.put(
  "/update/:userId",
  upload.single("user_img"),
  userController.updateDetails
);

/* ----------------------------- update phone number using id----------------------------- */
router.put("/update-phone/:userId", UpdateController.updatePhone);

/* ----------------------------- update maxminAge using id----------------------------- */
router.put("/update-age/:userId", UpdateController.updateMaxMinAge);

router.put("/update-min-age/:userId", UpdateController.updateMinAge);

router.put("/update-max-age/:userId", UpdateController.updateMaxAge);

/* ----------------------------- update maxdistance using id----------------------------- */
router.put("/update-distance/:userId", UpdateController.updateMaxDistance);
router.put("/update-location-lat-long/:userId", UpdateController.updateLocationByLatLong);

/* ----------------------------- update show me (gender) using id----------------------------- */
router.put("/update-showme/:userId", UpdateController.updateShowMe);

// /* ----------------------------- update (gender) using id----------------------------- */
router.put("/update-gender/:userId", UpdateController.updateGender);

// /* ----------------------------- update (gender) using id----------------------------- */
router.put("/update-aboutme/:userId", UpdateController.updateAboutMe);

// /* ----------------------------- update (gender) using id----------------------------- */
router.put("/update-jobtitle/:userId", UpdateController.updateJobTitle);

// /* ----------------------------- update (gender) using id----------------------------- */
router.put("/update-company/:userId", UpdateController.updateCompany);

// /* ----------------------------- update (gender) using id----------------------------- */
router.put("/update-school/:userId", UpdateController.updateSchool);

// /* ----------------------------- update (gender) using id----------------------------- */
router.put("/update-address/:userId", UpdateController.updateAddress);

// /* ----------------------------- update (gender) using id----------------------------- */
router.put("/update-livingin/:userId", UpdateController.updateLivingIn);

// /* ----------------------------- update (gender) using id----------------------------- */
router.put("/update-name/:userId", UpdateController.updateFirstName);

// /* ----------------------------- update (gender) using id----------------------------- */
router.put("/update-interest/:userId", UpdateController.updateInterest);

router.put("/update-sign/:userId", UpdateController.updateSign);

router.put("/update-pets/:userId", UpdateController.updatePets);

router.put("/update-sexual-orientation/:userId", UpdateController.updateSexual);

// router.put(
//   "/update-profile/:userId",  upload.single("image"),UpdateController.updateProfileImage
// );

module.exports = router;
