const Subscription = require('../models/subscription');
const Plan = require('../models/plan.model');
const User = require('../models/users.model');

const purchasePlan = async (req, res) => {
  try {
    const { month } = req.params;

    // Find the plan based on the planType
    const plan = await Plan.findOne({ type: month });

    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }
    // Assuming you have the user ID available in req.userId after authentication
    const userId = req.userId;
    // Check if the user already has an active subscription
    const existingSubscription = await Subscription.findOne({ user: userId, is_active: true });
    if (existingSubscription) {
      return res.status(400).json({ success: false, message: 'You already have an active subscription' });
    }

    // Create a new subscription
    const newSubscription = new Subscription({
      plan: plan._id,
      user: userId,
      status: 'pending', // You can change this based on your workflow
      is_active: false,
    });

    await newSubscription.save();

    return res.status(200).json({ success: true, message: 'Plan purchase initiated', subscription: newSubscription });
  } catch (error) {
    console.error('Error purchasing plan:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { purchasePlan };
