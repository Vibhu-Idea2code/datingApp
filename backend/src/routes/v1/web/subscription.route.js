const express=require('express');
const {SubscriptionController}=require('../../../controllers');
const router=express.Router();
const {
    refreshToken,
    accessToken,
  } = require("../../../middlewares/AdminAuth");

router.post('/create-sub',
SubscriptionController.createSubscription);

router.get('/list',
SubscriptionController.getSubList);


router.get('/list-dash',accessToken(),
SubscriptionController.getSubListDas);

// router.get('/id/:planId',
// planController.getPlanId);

// router.delete('/delete/:planId',
// planController.deletePlan);

// router.put('/update/:planId',
// planController.updatePlan);

// router.delete("/delete-many", planController.multipleDelete);

// router.put("/updatePlanStatus/:id",planController.updatePlansStatus);

module.exports=router;