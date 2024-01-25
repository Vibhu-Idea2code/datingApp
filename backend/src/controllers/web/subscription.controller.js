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
            const staticAgeRange = [
              { min: 18, max: 25 },
              { min: 26, max: 30 },
            ];
  
      const ageRangeDetails = {};
  
      for (const range of staticAgeRange) {
        // Find subscriptions for users within the current age range and with the specified nationality
        const subscriptions = await Subscription.find({
          'userid.age': { $gte: range.min, $lte: range.max },
        })
          .populate({
            path: 'userid',
            populate: { path: 'user' } // Populate the countryCode field in the user document
          });
  
        // Filter subscriptions based on nationality (assuming 'nationality' is a field in the CountryCode model)
        const filteredSubscriptions = subscriptions.filter(sub => sub.userid.countryCode.nationality === 'desiredNationality');
  
        // Store details for the current age range
        ageRangeDetails[`${range.min}-${range.max}`] = {
          subscriptions: filteredSubscriptions,
        };
      }
  
      res.status(200).json({
        message: "Successfully fetched subscriptions based on age range and nationality",
        status: true,
        ageRangeDetails,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  
  

  
  
  
  



  
module.exports = { createSubscription,getSubList,getSubListDas}
