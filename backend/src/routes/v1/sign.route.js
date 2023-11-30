const express=require('express');
const {zodiacSignController}=require('../../controllers');
const router=express.Router();

router.post('/create-sign',
zodiacSignController.createZodiac);

router.get('/list',
zodiacSignController.getZodiacList);

router.get('/id/:signId',
zodiacSignController.getZodiacId);

router.delete('/delete/:signId',
zodiacSignController.deleteZodiac);

router.put('/update/:signId',
zodiacSignController.updateZodiac);
module.exports=router;