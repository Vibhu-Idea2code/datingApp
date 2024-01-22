const express = require("express");
const User = require("../../models/users.model");


const Subscription = require("../../models/subscription.model");


const mongoose = require("mongoose");

//Get Dashboard Count Data
const getDashboardCount = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const subscriptionCount = await Subscription.countDocuments();
  

    const result = {
      userCount: userCount,
      subscriptionCount: subscriptionCount,
     
    };

    res.status(200).json({
        success: true,
        message: "list successfully!",
        data: result,
      });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getDashboardCount,
};