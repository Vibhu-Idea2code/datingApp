const express = require("express");
const User = require("../../models/users.model");


const Subscription = require("../../models/subscription.model");


const mongoose = require("mongoose");

//Get Dashboard Count Data
const getDashboardCount = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const subscriptionCount = await Subscription.countDocuments();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const thisWeekStart = new Date();
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
    thisWeekStart.setHours(0, 0, 0, 0);

    const thisMonthStart = new Date();
    thisMonthStart.setDate(1);
    thisMonthStart.setHours(0, 0, 0, 0);

    const userCountToday = await User.countDocuments({ createdAt: { $gte: todayStart } });
    const subscriptionCountToday = await Subscription.countDocuments({ createdAt: { $gte: todayStart } });

    const userCountThisWeek = await User.countDocuments({ createdAt: { $gte: thisWeekStart } });
    const subscriptionCountThisWeek = await Subscription.countDocuments({ createdAt: { $gte: thisWeekStart } });

    const userCountThisMonth = await User.countDocuments({ createdAt: { $gte: thisMonthStart } });
    const subscriptionCountThisMonth = await Subscription.countDocuments({ createdAt: { $gte: thisMonthStart } });


    const result = {
     
        today: userCountToday,
        thisWeek: userCountThisWeek,
        thisMonth: userCountThisMonth,
        userCount: userCount,
        subscriptionCount: subscriptionCount,
    
        subtoday: subscriptionCountToday,
        subthisWeek: subscriptionCountThisWeek,
        subthisMonth: subscriptionCountThisMonth,
      // },
      // subscriptionCount: {
        
      // },
  //  today: userCountToday,
  //     thisWeek: userCountThisWeek,
  //     thisMonth: userCountThisMonth,
  //     today: subscriptionCountToday,
  //     thisWeek: subscriptionCountThisWeek,
  //     thisMonth: subscriptionCountThisMonth,
     
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