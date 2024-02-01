const express=require('express');
const {zodiacSignController}=require('../../../controllers');
const router=express.Router();
const {
    refreshToken,
    accessToken,
  } = require("../../../middlewares/AdminAuth");

router.post('/create-sign',
zodiacSignController.createZodiac);

router.get('/list',accessToken(),
zodiacSignController.getZodiacList);

router.get('/id/:signId',
zodiacSignController.getZodiacId);

router.delete('/delete/:signId',
zodiacSignController.deleteZodiac);

router.put('/update/:signId',
zodiacSignController.updateZodiac);

router.delete("/delete-many", zodiacSignController.multipleDelete);

router.put("/updateSignStatus/:id",zodiacSignController.updateZodiacSignStatus);

module.exports=router;