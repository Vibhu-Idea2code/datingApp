const { Subscription } = require("../models");

/**create Like */
const createSubscription = async (reqBody) => {
  return Subscription.create(reqBody);
};
/**get Subscription list */
const getSubscriptionList = async (filter, options) => {
 return Subscription.find().populate({
    path: "planid",
    select: ["_id", "name","planType","price","duration"],
  }).populate({
    path: "userid",
    select: ["_id", "first_name"],
  });
};


/**get Subscription details by id */
const getSubscriptionById = async (SubscriptionId) => {
  return Subscription.findById(SubscriptionId);
};

/**update Subscription and token */
const updateSubscription = async (SubscriptionId, updateBody) => {
  return Subscription.findByIdAndUpdate(SubscriptionId, { $set: updateBody });
};

/**delete Subscription */
const deleteSubscription = async (SubscriptionId) => {
  return Subscription.findByIdAndDelete(SubscriptionId);
};
/**
 * Manage product status
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const manageSubscriptionStatus = async (SubscriptionId) => {
    const SubscriptionExists = await getSubscriptionById(SubscriptionId);
    if (!SubscriptionExists) {
      throw new Error("Subscription not found!");
    }
  
    return Banner.findOneAndUpdate(
      { _id: SubscriptionId },
      {
        $set: {
          is_active: !SubscriptionExists.is_active,
        },
      },
      { new: true }
    );
  };
  
module.exports = {
  createSubscription,
  getSubscriptionList,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  manageSubscriptionStatus
};