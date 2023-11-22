const express=require('express');
const {sexualController}=require('../../controllers');
const router=express.Router();

router.post('/create-sexual',
sexualController.createSexual);

router.get('/list',
sexualController.getSexualList);

router.get('/id/:SexualId',
sexualController.getSexualId);

router.delete('/delete/:SexualId',
sexualController.deleteSexual);

router.put('/update/:SexualId',
sexualController.updateSexual);
module.exports=router;