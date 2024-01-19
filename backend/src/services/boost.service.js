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
    console.log(updatedUser,"123456789")

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





/**get Boost list */
const getBoostList = async (filter, options) => {
 return Boost.find().populate({
    path: "touserid",
    select: ["_id", "first_name"],
  });
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
  deleteBoostById
};