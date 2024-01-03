const express = require("express");
const {
  adminController,
  authAdminController,
  adminUserController,
} = require("../../../controllers");
const { upload } = require("../../../middlewares/upload");
const router = express.Router();
// const auth = require("../../middlewares/auth");
const {
  refreshToken,
  accessToken,
} = require("../../../middlewares/AdminAuth");

/* ------------------------------ ADMIN ROUTES [AUTH]------------------------------ */
router.post(
  "/create-admin",
  upload.single("admin_image"),
  authAdminController.register);

router.post("/login", authAdminController.login);

router.post(
  "/forgot",
  // body("password").isLength({min: 7}).withMessage('Password needs to be atleast 7 character long'),
  authAdminController.forgetPassword
);
router.post("/verifyotp", authAdminController.verifyOtp);

router.post(
  "/change-password",
  // accessToken(),
  authAdminController.changePassword
);

// router.post("/refreshToken", authAdminController.RefreshToken);

router.put(
  "/resetPassword",
  //  accessToken(),
  authAdminController.resetPassword
);

router.get(
  "/list",
   accessToken(),
  // refreshToken(),
  adminController.getAdminList
);


router.put(
  "/update/:adminId",
  upload.single("admin_image"),
  adminController.updateAdmin
);
router.delete("/delete-admin/:adminId", adminController.deleteAdmin);

/* -------------------------- CREATE USER BY ADMIN -------------------------- */
router.get("/user-list", adminUserController.getAllUser);
router.post(
  "/create-user",
  upload.array("user_img"),
  adminUserController.UserRegisterByAdmin
);
router.put(
  "/update-user/:userId",
  upload.array("user_img"),
  adminUserController.UserUpdateDetailsByAdmin
);
router.delete("/delete-user/:userId", adminUserController.deleteUserByAdmin);
router.delete("/delete-many", adminUserController.deleteManyUsersByAdmin);

router.put("/updateUserStatus/:id",adminUserController.updateUserStatus);

router.delete("/deleteMultiUser",adminUserController.deleteMultiUser);

// router.get("/role", auth());

module.exports = router;
