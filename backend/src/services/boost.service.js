const { Boost, User } = require("../models");

/**create Boost */
// const createBoost = async (reqBody) => {
//   return Boost.create(reqBody);
// };
// boostService.js

// Import your user model

async function createBoost(boostData) {
  try {
    // Assuming you have a Boost model
    const newBoost = await Boost.create(boostData);

    // Assuming boostData contains the user ID
    const user = await User.findByIdAndUpdate(
      boostData.userId,
      { $set: { boostStatus: true } },
      { new: true }
    );

    return { boost: newBoost, user };
  } catch (error) {
    throw new Error(`Error creating boost: ${error.message}`);
  }
}

// boostService.js

// const UserModel = require('./models/user'); // Import your user model

async function updateUserStatus(userId, newStatus) {
  try {
    // Assuming you have a 'boostStatus' field in your user model
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: newStatus },
      { new: true }
    );
    // console.log(updatedUser,"123456789")

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user status: ${error.message}`);
  }
}

const getExpiredBoosts = async () => {
  try {
    // Find boosts where endTime is less than or equal to the current time
    const currentDateTime = new Date();
    const expiredBoosts = await Boost.find({ endTime: { $lte: currentDateTime } });

    return expiredBoosts;
  } catch (error) {
    throw new Error(`Error while getting expired boosts: ${error.message}`);
  }
};

// Assuming a mongoose-like syntax for database queries
const getUserBoostCountInMonth = async (userId, year, month) => {
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

  const boostCount = await Boost.countDocuments({
    user: userId,
    startTime: { $gte: startOfMonth, $lte: endOfMonth },
  });

  return boostCount;
};


async function incrementUserBoostCount(userId) {
  try {
    // Find the user by ID and increment the boostCount
    const updatedUser = await User.findByIdAndUpdate(userId, { $inc: { boostCount: 1 } }, { new: true });

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw new Error("Error incrementing user boost count");
  }
}

// async function getUserBoostCountInMonth(userId, month) {
//   try {
//     // Find boosts created by the user in the current month
//     const boosts = await Boost.find({
//       createdBy: userId,
//       startTime: {
//         $gte: new Date(new Date().getFullYear(), month, 1),
//         $lt: new Date(new Date().getFullYear(), month + 1, 1)
//       }
//     });

//     return boosts.length;
//   } catch (error) {
//     throw new Error(`Error getting user boost count: ${error.message}`);
//   }
// }


async function getBoostCountThisMonth(userId) {
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);

  const boostCount = await Boost.countDocuments({
    userId: userId,
    startTime: { $gte: startOfMonth, $lte: endOfMonth },
  });

  return boostCount;
}

/**get Boost list */
const getBoostList = async (filter, options) => {
 return Boost.find().populate({
    path: "touserid",
    select: ["_id", "first_name"],
  });
};

const getLastBoostTime = async (userId) => {
  try {
    const lastBoost = await Boost.findOne({ userId }).sort({ startTime: -1 });

    if (lastBoost) {
      return lastBoost.startTime.getTime(); // Return the timestamp of the last boost
    }

    return null; // User hasn't boosted before
  } catch (error) {
    throw new Error(`Error getting last boost time: ${error.message}`);
  }
};

const isEligibleForBoost = async (userId) => {
  try {
    const lastBoostTime = await getLastBoostTime(userId);

    if (!lastBoostTime) {
      // User hasn't boosted before, so they are eligible
      return true;
    }

    const currentTime = new Date().getTime();
    const thirtyMinutesAgo = currentTime - 30 * 60 * 1000; // 30 minutes in milliseconds

    // Check if the last boost time is before the cutoff time
    return lastBoostTime < thirtyMinutesAgo;
  } catch (error) {
    throw new Error(`Error checking boost eligibility: ${error.message}`);
  }
};

/**get Boost details by id */
const getBoostById = async (boostId) => {
  return Boost.findById(boostId);
};

/**update Boost and token */
const updateBoost = async (boostId, updateBody) => {
  return Boost.findByIdAndUpdate(boostId, { $set: updateBody });
};

/**delete Boost */
const deleteBoost = async (boostId) => {
  return Boost.findByIdAndDelete(boostId);
};
/**
 * Manage product status
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const manageBoostStatus = async (boostId) => {
    const BoostExists = await getBoostById(boostId);
    if (!BoostExists) {
      throw new Error("Boost not found!");
    }
  
    return Banner.findOneAndUpdate(
      { _id: boostId },
      {
        $set: {
          is_active: !BoostExists.is_active,
        },
      },
      { new: true }
    );
  };
  
  const deleteBoostById = async (boostId) => {
    try {
      // Find and delete the boost by its ID
      const deletedBoost = await Boost.findByIdAndDelete(boostId);
  
      if (!deletedBoost) {
        throw new Error(`No boost found with ID ${boostId}`);
      }
  
      return deletedBoost;
    } catch (error) {
      throw new Error(`Error while deleting boost: ${error.message}`);
    }
  };
module.exports = {
  createBoost,
  getBoostList,
  getBoostById,
  updateBoost,
  deleteBoost,
  manageBoostStatus,
  updateUserStatus,
  getExpiredBoosts,
  incrementUserBoostCount,
  deleteBoostById,
  getLastBoostTime,
  isEligibleForBoost,
  getBoostCountThisMonth,
  getUserBoostCountInMonth
};