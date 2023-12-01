const express = require("express");
const { userController, authController, UpdateController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const {upload}=require("../../middlewares/upload");
const router = express.Router();

// router.post(
//   "/send-mail",
// authController.createUser
// );
router.post('/verify-otp', authController.verifyOtp);
/* -------------------------------------------------------------------------- */
/*                                AUTH ROUTE                                */
/* -------------------------------------------------------------------------- */

/* -------------------------- register/signUp/create  user -------------------------- */
// router.post("/create-user", upload.single("profile"), authController.register);
// router.post("/create-user", authController.createUser);
router.post("/create-user",upload.single("user_img"), authController.register);
// router.post(
//   "/send-mail",
// authController.register 
// );
/* ---------------------------- LOGIN/SIGNIN USER --------------------------- */
router.post("/login", authController.loginEmail);
router.post("/login-phone", authController.checkUserPh);
/* -------------------------- FORGOT PASSWORD USER ------------------------- */
router.post(
  "/forgot",
  // body("password").isLength({min: 7}).withMessage('Password needs to be atleast 7 character long'),
  authController.forgetPassword
);
/* ------------------------------- VERIFY OTP ------------------------------- */
router.post("/verifyOtp", authController.verifyOtp);
/* -------------------------- RESET PASSWORD USER ------------------------- */
router.put("/resetPassword",auth(), authController.resetPassword);
/* ----------------------------- CHANGE PASSWORD ---------------------------- */
router.post("/change-password/:_id", auth(), authController.changePassword);


/* -------------------------------------------------------------------------- */
/*                                    USER ROUTE                                    */
/* -------------------------------------------------------------------------- */

/* ------------------------------- get user list ------------------------------------------- */
// router.get("/list-user", auth(), userController.getUserList);
router.get("/role", userController.getAllUser);
router.get("/role-list", auth(), userController.getUserListRole);
router.get("/list",  userController.userList);


/* ----------------------------- get user by id ----------------------------- */
router.get("/getid-user/:userId", userController.getUserDetails);
router.get("/getid-user-all/:userId", userController.getUserDetailsAll);

// router.get("/setting-user/:userId", userController.updateSetting);

//  /* ---------------------------- delete user list ---------------------------- */
router.delete("/delete-user/:userId", userController.deleteUser);
router.delete("/delete-many", userController.deleteManyUsers);

// /* ------------------------- update user info ------------------------ */
router.put("/update/:userId", userController.updateDetails);
// router.put("/update/:userId",upload.single("profile_img"), userController.updateDetails);

/* ----------------------------- update phone number using id----------------------------- */
router.put("/update-phone/:userId", UpdateController.updatePhone);

/* ----------------------------- update maxminAge using id----------------------------- */
router.put("/update-age/:userId", UpdateController.updateMaxMinAge);

/* ----------------------------- update maxdistance using id----------------------------- */
router.put("/update-distance/:userId", UpdateController.updateMaxDistance);

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
module.exports = router;