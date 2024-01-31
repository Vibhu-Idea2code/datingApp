const express=require('express');
const {purchasePlanController}=require('../../../controllers');
const router=express.Router();

router.post('/create-purchasePlan',
purchasePlanController.createPurchasePlan);

router.get('/list',
purchasePlanController.purchasePlanList);

// router.get('/id/:planId',
// purchasePlanController.getPlanId);

// router.delete('/delete/:planId',
// purchasePlanController.deletePlan);

// router.put('/update/:planId',
// purchasePlanController.updatePlan);

// router.delete("/delete-many", purchasePlanController.multipleDelete);

// router.put("/updatePlanStatus/:id",purchasePlanController.updatePlansStatus);

module.exports=router;