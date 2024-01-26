const { Subscription, User } = require("../../models");
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
        // Define age ranges
        const ageRanges = [
            { min: 18, max: 20 },
            { min: 21, max: 26 },
            { min: 27, max: 29 },
            { min: 30, max: 35 },
            { min: 31, max: 41 },
            { min: 42, max: 52 },
            { min: 53, max: Infinity },
            // Add more age ranges as needed
            // ... add more age ranges as necessary
        ];

        const ageRangeDetails = {};

        // Loop through each age range
        for (const range of ageRanges) {
            // Count users within the current age range
            const usersCount = await User.countDocuments({
                age: { $gte: range.min, $lte: range.max },
            });

            // Retrieve subscriptions based on age range
            let subscriptions = await subscriptionService.getSubscriptionList(req, res, {
                ageRange: range,
                // Add more filters if needed
            });

            // Include user details only if there are users
            if (usersCount > 0) {
                ageRangeDetails[`${range.min}-${range.max}`] = {
                    users: usersCount,
                   
                    user_details: await User.find({ age: { $gte: range.min, $lte: range.max } },), // Include user details
                };
            } else {
                ageRangeDetails[`${range.min}-${range.max}`] = {
                    users: 0,
                };
            }

            // Exclude user details when usersCount is 0
            if (usersCount === 0) {
                delete ageRangeDetails[`${range.min}-${range.max}`].user_details;
            }

            console.log(`Subscriptions for age range ${range.min}-${range.max}:`, subscriptions);
        }

        res.status(200).json({
            message: "Successfully fetched subscriptions with filters",
            status: true,
            data: ageRangeDetails,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};





  
  

  
  
  
  
module.exports = { createSubscription,getSubList,getSubListDas}
