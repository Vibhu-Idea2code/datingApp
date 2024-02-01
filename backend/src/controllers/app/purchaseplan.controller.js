
const { PurchasePlan, Plan ,User} = require("../../models");
// const { planService } = require("../../services");
const mongoose = require("mongoose");
// const { findOneAndUpdate } = require("../../models/like.model");

const createPurchasePlan = async (req, res) => {
    try {
      const reqBody = req.body;
      console.log(reqBody, "++++++PurchasePlan");
  
      const plan = await PurchasePlan.create(
        reqBody,
      );
  
      if (!plan) {
        throw new Error("no such Plan");
      }
  

      res.status(200).json({
        message: "Successfully created a new Plan",
        success: true,
        data: freeBoostValue,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

//   const purchasePlanList=async(req,res)=>{
//     try {
//         let data = await PurchasePlan.find().populate({
//             path: 'plan',
//             select: 'freeBoost'
//         });
    
//         // Create an object to store total boosts for each user
//         let totalBoosts = {};
    
//         // Now, you can access the values of freeBoost from the populated plan
//         if (data && data.length > 0) {
//             data.forEach(item => {
//                 // Sum up freeBoost values for all plans
//                 let freeBoostValue = item.plan.reduce((total, planItem) => total + (planItem.freeBoost || 0), 0);
    
//                 // Now you can use freeBoostValue in your code as needed
//                 console.log('Free Boost Value:', freeBoostValue);
    
//                 // You can add freeBoostValue to your existing data structure if needed
//                 item.boost = freeBoostValue;
    
//                 // Calculate total boost for each user
//                 if (item.user in totalBoosts) {
//                     totalBoosts[item.user] += freeBoostValue;
//                 } else {
//                     totalBoosts[item.user] = freeBoostValue;
//                 }
//             });
//         }
    
//         res.status(200).json({ success: true, data, totalBoosts });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
//    }

const purchasePlanList = async (req, res) => {
    try {
        let data = await PurchasePlan.find()
            .populate({
                path: 'plan',
                select: 'freeBoost'
            })
            .populate({
                path: 'user',
                select: 'boost'
            });

        data = data.map((item) => {
            if (item.user && item.plan) {
                // Check if user's boost is greater than 0
                if (item.user.boost > 0) {
                    // Decrement boost by 1
                    item.user.boost -= 1;
                } else {
                    // If boost is already 0, do not try to boost
                    item.user.boost = 0;
                }
                item.user.boost = item.plan.freeBoost;
            }
            return item;
        });

        res.status(200).json({ success: true, data });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};







module.exports = { createPurchasePlan,purchasePlanList};
