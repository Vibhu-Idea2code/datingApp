const express=require('express');
const {adminController,authAdminController}=require('../../controllers');
const {upload}=require("../../middlewares/upload");
const router=express.Router();
// const auth = require("../../middlewares/auth");
const { refreshToken, accessToken } = require("../../middlewares/auth3");

router.post('/create-admin',upload.single("admin_image"),
adminController.register);

router.post("/login", adminController.login);

router.post(
    "/forgot",
    // body("password").isLength({min: 7}).withMessage('Password needs to be atleast 7 character long'),
    adminController.forgetPassword
  );
  router.post("/verifyotp", adminController.verifyOtp);

  router.post("/change-password/:id",accessToken(), adminController.changePassword);

  router.put("/resetPassword",accessToken(), adminController.resetPassword);

  router.get("/list", accessToken(), authAdminController.getAdminList);    
  router.put("/update/:adminId", upload.single("admin_image"),authAdminController.updateAdmin);
  router.delete("/delete-admin/:adminId", authAdminController.deleteAdmin);


/**admin user  */
router.get("/user-list",authAdminController.getAllUser);
router.post("/create-user", upload.single("user_img"), authAdminController.register);
router.put("/update-user/:userId",upload.single("user_img"), authAdminController.updateDetails);
router.delete("/delete-user/:userId", authAdminController.deleteUser);
router.delete("/delete-many", authAdminController.deleteManyUsers);


// router.get("/role", auth());



module.exports=router;