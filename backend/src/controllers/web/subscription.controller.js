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
      // Define age ranges
      const ageRanges = [
        { min: 18, max: 25 },
        { min: 26, max: 30 },
        // Add more age ranges as needed
      ];
  
      // Create an object to store user counts for each age range
      const ageRangeCounts = {};
  
      // Loop through each age range
      ageRanges.forEach(range => {
        // Use filter to get users within the current age range
        const usersInAgeRange = Subscription.filter(user => user.age >= range.min && user.age <= range.max);
  
        // Store the count for the current age range
        ageRangeCounts[`${range.min}-${range.max}`] = usersInAgeRange.length;
      });
  
      res.status(200).json({
        message: "Successfully fetched subscription data with age filtering",
        status: true,
        ageRangeCounts,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  
module.exports = { createSubscription,getSubList,getSubListDas}
