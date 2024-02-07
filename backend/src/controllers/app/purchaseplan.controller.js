const { PurchasePlan, Plan, User } = require("../../models");
// const { planService } = require("../../services");
const mongoose = require("mongoose");
const { userService } = require("../../services");
const { startSession } = require("../../models/admin.model");


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
    user.superlike += plan.freeSuperLike;

    console.log(user.boost);
    console.log(user.superlike, "46546");

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

const purchasePlanList = async (req, res) => {
  try {
    let data = await PurchasePlan.find()
      .populate({
        path: "plan",
        select: "freeBoost freeSuperLike"
      })
      .populate({
        path: "user",
        select: "boost superlike",
      });

    data = data.map((item) => {
      if (item.user && item.plan  ) {
        // Check if user's boost is greater than 0
        if (item.user.boost > 0 || item.user.superlike) {
          // Decrement boost by 1
          item.user.boost -= 1;
          item.user.superlike -= 1;

        } else {
          // If boost is already 0, do not try to boost
          item.user.boost = 0;
          item.user.superlike = 0;

        }
        item.user.boost = item.plan.freeBoost;
        item.user.superlike = item.plan.freeSuperLike;

      }
      return item;
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { createPurchasePlan, purchasePlanList };
