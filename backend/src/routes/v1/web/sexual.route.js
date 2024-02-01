const express=require('express');
const {sexualController}=require('../../../controllers');
const router=express.Router();
const {
    refreshToken,
    accessToken,
  } = require("../../../middlewares/AdminAuth");

router.post('/create-sexual',
sexualController.createSexual);

router.get('/list',
accessToken(),
sexualController.getSexualList);

router.get('/id/:SexualId',
sexualController.getSexualId);

router.delete('/delete/:SexualId',
sexualController.deleteSexual);

router.put('/update/:SexualId',
sexualController.updateSexual);

router.delete("/delete-many", sexualController.multipleDelete);

router.put("/updateSexualOrientationStatus/:id",sexualController.updateSexualOrientationStatus);


module.exports=router;