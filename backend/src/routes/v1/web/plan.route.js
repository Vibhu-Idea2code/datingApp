const express=require('express');
const {planController}=require('../../../controllers');
const router=express.Router();
const {
    refreshToken,
    accessToken,
  } = require("../../../middlewares/AdminAuth");

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

router.delete("/delete-many", planController.multipleDelete);

router.put("/updatePlanStatus/:id",planController.updatePlansStatus);

module.exports=router;