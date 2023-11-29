const express=require('express');
const {adminController,authAdminController}=require('../../controllers');
const {upload}=require("../../middlewares/upload");
const router=express.Router();
const auth = require("../../middlewares/auth");

router.post('/create-admin',upload.single("admin_image"),
adminController.register);

router.post("/login", adminController.login);

router.post(
    "/forgot",
    // body("password").isLength({min: 7}).withMessage('Password needs to be atleast 7 character long'),
    adminController.forgetPassword
  );
  router.post("/verifyotp", adminController.verifyOtp);

  router.post("/change-password/:id",auth(), adminController.changePassword);

  router.put("/resetPassword",auth(), adminController.resetPassword);

  router.get("/list", auth(), authAdminController.getAdminList);    
  router.put("/update/:adminId", authAdminController.updateAdmin);
  router.delete("/delete-admin/:adminId", authAdminController.deleteAdmin);

// router.get('/list-sexual',
// adminController.sexualList);

// router.get('/list-sign',
// adminController.signList);




module.exports=router;