const express = require("express");
const { userController, authController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const {upload}=require("../../middlewares/upload");
const router = express.Router();


/* -------------------------------------------------------------------------- */
/*                                AUTH ROUTE                                */
/* -------------------------------------------------------------------------- */

/* -------------------------- register/signUp/create  user -------------------------- */
// router.post("/create-user", upload.single("profile"), authController.register);
router.post("/create-user", authController.createUser);
// router.post("/create-user", authController.register);
// router.post(
//   "/send-mail",
// authController.register 
// );
/* ---------------------------- LOGIN/SIGNIN USER --------------------------- */
router.post("/login", authController.login);
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
router.get("/list", auth(), userController.getUserList);
router.get("/role", auth(), userController.getAllUser);
router.get("/role-list", auth(), userController.getUserListRole);

/* ----------------------------- get user by id ----------------------------- */
router.get("/getid-user/:userId", userController.getUserDetails);
//  /* ---------------------------- delete user list ---------------------------- */
router.delete("/delete-user/:userId", userController.deleteUser);
router.delete("/delete-many", userController.deleteManyUsers);

// /* ------------------------- update user info ------------------------ */
// router.put("/update/:userId", userController.updateDetails);
router.put("/update/:userId",upload.single("profile_img"), userController.updateDetails);


module.exports = router;