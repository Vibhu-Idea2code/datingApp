const express=require('express');
const {planController}=require('../../controllers');
const router=express.Router();

router.post('/create-plan',
planController.createPlan);

router.get('/list',
planController.getPlanList);

router.get('/id/:planId',
planController.getPlanId);

router.delete('/delete/:planId',
planController.deletePlan);

router.put('/update/:planId',
planController.updatePlan);
module.exports=router;