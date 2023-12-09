const express=require('express');
const {adminController,authAdminController}=require('../../controllers');
const {upload}=require("../../middlewares/upload");
const router=express.Router();
const auth = require("../../middlewares/auth");
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
  // router.put("/reset/:id", upload.single("admin_image"), adminController.updateProfile)
  // router.post('/refresh-token', adminController.refresh);  
  // router.post("/refreshToken", adminController.RefreshToken);
  router.post("/change-password/:id",auth(), adminController.changePassword);

  router.put("/resetPassword",auth(), adminController.resetPassword);
  router.post("/refreshtoken", refreshToken);
  router.get("/list", auth(), authAdminController.getAdminList);    
  router.put("/update/:adminId", upload.single("admin_image"),authAdminController.updateAdmin);
  router.delete("/delete-admin/:adminId", authAdminController.deleteAdmin);

// router.get('/list-sexual',
// adminController.sexualList);

// router.get('/list-sign',
// adminController.signList);

/**admin user  */
router.get("/user-list",authAdminController.getAllUser);
router.post("/create-user", upload.single("user_img"), authAdminController.register);
router.put("/update-user/:userId",upload.single("user_img"), authAdminController.updateDetails);

// router.get("/role", auth());



module.exports=router;