const { Subscription } = require("../../models");
const { subscriptionService } = require("../../services");
const mongoose = require("mongoose");

const createSubscription = async (req, res) => {
    try {
      const reqBody = req.body;
      
      // Assuming the plan duration is specified in days
      const planDuration = reqBody.planDurationInDays || 30; // Default to 30 days if not provided
      
      // Set the StartDate to the current date and time
      reqBody.startDate = new Date();
  
      // Calculate the endDate by adding planDuration days to the StartDate
      reqBody.endDate = new Date(reqBody.startDate);
      reqBody.endDate.setDate(reqBody.endDate.getDate() + planDuration);
  
      const sub = await subscriptionService.createSubscription(reqBody);
  
      if (!sub) {
        return res.status(400).json({ message: "Error creating the subscription" });
      }
  
      res.status(200).json({
        message: "Successfully created a new Subscription",
        success: true,
        data: {
          subscription: sub,
        },
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
};

  
  
  

  const getSubList = async (req, res) => {
    try {
      let Subscription = await subscriptionService.getSubscriptionList(req, res);
      res.status(200).json({
        message: "successfully fetched all Subscription",
        status: true,
        data: Subscription ,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };


  const getSubListDas = async (req, res) => {
    try {
      const subscriptions = await Subscription.aggregate([
        {
          $lookup: {
            from: "users", // Assuming the name of your user collection is "users"
            localField: "userid",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $group: {
            _id: {
              $switch: {
                branches: [
                  { case: { $and: [{ $gte: ["$user.age", 18] }, { $lte: ["$user.age", 30] }] }, then: "18-30" },
                  { case: { $and: [{ $gte: ["$user.age", 31] }, { $lte: ["$user.age", 39] }] }, then: "30-39" },
                  // Add more cases for other age ranges as needed
                ],
                default: "Unknown",
              },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            ageRange: "$_id",
            count: 1,
            _id: 0,
          },
        },
      ]);

      res.status(200).json({
        message: "successfully fetched all Subscription",
        status: true,
        data: subscriptions,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
};



  
module.exports = { createSubscription,getSubList,getSubListDas}
