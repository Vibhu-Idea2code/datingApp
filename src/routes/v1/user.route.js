const express = require("express");
const { userController, authController, phoneUpdateController } = require("../../controllers");
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
router.post("/create-user", authController.register);
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
// router.get("/list", auth(), userController.getUserList);
// router.get("/role", auth(), userController.getAllUser);
// router.get("/role-list", auth(), userController.getUserListRole);
router.get("/list",  userController.userList);


/* ----------------------------- get user by id ----------------------------- */
// router.get("/getid-user/:userId", userController.getUserDetails);
// router.get("/setting-user/:userId", userController.updateSetting);

//  /* ---------------------------- delete user list ---------------------------- */
router.delete("/delete-user/:userId", userController.deleteUser);
router.delete("/delete-many", userController.deleteManyUsers);

// /* ------------------------- update user info ------------------------ */
// router.put("/update/:userId", userController.updateDetails);
// router.put("/update/:userId",upload.single("profile_img"), userController.updateDetails);

/* ----------------------------- update phone number using id----------------------------- */
router.put("/update-phone/:userId", phoneUpdateController.updatePhone);



module.exports = router;