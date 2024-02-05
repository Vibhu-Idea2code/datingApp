const { Subscription, User } = require("../../models");
const { subscriptionService, userService } = require("../../services");
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
      return res
        .status(400)
        .json({ message: "Error creating the subscription" });
    }
    const updatedUser = await subscriptionService.updateUserDas(
      reqBody.userid,
      true
    );

    if (!updatedUser) {
      return res
        .status(400)
        .json({ message: "Error updating user subscription" });
    }
    res.status(200).json({
      message: "Successfully created a new Subscription",
      success: true,
      data: {
        subscription: sub,
        user: updatedUser,
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
      data: Subscription,
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
      { min: 53, max: 64 },
      { min: 65, max: Infinity },
    ];

    const ageRangeDetails = [];

    for (const range of ageRanges) {
      const users = await User.find({
        age: { $gte: range.min, $lte: range.max },
        countryCode: { $exists: true },
      });

      const ageRangeDetail = {
        range: `${range.min}-${range.max}`,
        userCount: users.length,
        subscriptionCount: 0, // Initialize subscription count for this age range
        subscriptionPercentage: 0, // Initialize subscription percentage
        nationalityCounts: {},
        sub: [],
      };

      if (users.length > 0) {
        const subscriptionUsers = await User.find({
          age: { $gte: range.min, $lte: range.max },
          countryCode: { $exists: true },
          subscription: true, // Filter users with subscription
        });

        ageRangeDetail.subscriptionCount = subscriptionUsers.length;

        const subscriptionPercentage =
        ((subscriptionUsers.length / users.length) * 100).toFixed(2);
        ageRangeDetail.subscriptionPercentage = parseFloat(subscriptionPercentage);

        const nationalityCounts = await User.aggregate([
          {
            $match: {
              age: { $gte: range.min, $lte: range.max },
              countryCode: { $exists: true },
              subscription: true, // Include subscription filter
            },
          },
          {
            $group: {
              _id: "$countryCode",
              count: { $sum: 1 },
            },
          },
        ]);

        nationalityCounts.forEach((item) => {
          ageRangeDetail.nationalityCounts[item._id] = item.count;
        });
      }

      ageRangeDetails.push(ageRangeDetail);
    }

    res.status(200).json({
      message: "Successfully fetched subscriptions with filters",
      status: true,
      data: ageRangeDetails,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};



module.exports = { createSubscription, getSubList, getSubListDas };
