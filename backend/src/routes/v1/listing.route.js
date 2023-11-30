const express=require('express');
const {listingController}=require('../../controllers');
const router=express.Router();

router.get('/list-interest',
listingController.interestList);

router.get('/list-pets',
listingController.petList);

router.get('/list-sexual',
listingController.sexualList);

router.get('/list-sign',
listingController.signList);




module.exports=router;