const { PurchasePlan, Plan, User } = require("../../models");
// const { planService } = require("../../services");
const mongoose = require("mongoose");
const { userService } = require("../../services");
const { startSession } = require("../../models/admin.model");
// const { findOneAndUpdate } = require("../../models/like.model");

// Assuming you have a User model and a Plan model imported
// const User = require('../models/User');
// const Plan = require('../models/Plan');

const createPurchasePlan = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody, "reqBody");

    // Check if the user exists
    const user = await User.findById(reqBody.user);
    console.log(user, "user");

    if (!user) {
      throw new Error("User not found");
    }

    // Assuming you have a 'freeBoost' field in the 'plan' model
    const plan = await Plan.findById(reqBody.plan);
    console.log(plan, "plan");

    if (!plan) {
      throw new Error("Plan not found");
    }

    // Update the 'freeBoost' field in the 'plan' model with the 'boost' value from the 'user' model
    user.boost += plan.freeBoost;
    console.log(user.boost);

    // Save the updated user
    await user.save();

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    console.log(endDate, "endDate");

    const createPlan = await PurchasePlan.create(reqBody);
    // Send the response or perform additional actions
    res.status(200).json({
      message: "Purchase plan created successfully",
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      createPlan,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
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
        path: "plan",
        select: "freeBoost",
      })
      .populate({
        path: "user",
        select: "boost",
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

module.exports = { createPurchasePlan, purchasePlanList };
