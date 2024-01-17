const { SuperLike } = require("../models");

/**create Like */
const createSuperLike = async (reqBody) => {
  return SuperLike.create(reqBody);
};
/**get SuperLike list */
const getSuperLikeList = async (filter, options) => {
 return SuperLike.find();
};

/**get SuperLike details by id */
const getSuperLikeById = async (SuperlikeId) => {
  return SuperLike.findById(SuperlikeId);
};

/**update SuperLike and token */
const updateSuperLike = async (SuperlikeId, updateBody) => {
  return SuperLike.findByIdAndUpdate(SuperlikeId, { $set: updateBody });
};

/**delete SuperLike */
const deleteSuperLike = async (SuperlikeId) => {
  return SuperLike.findByIdAndDelete(SuperlikeId);
};
/**
 * Manage product status
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const manageSuperLikeStatus = async (SuperlikeId) => {
    const SuperLikeExists = await getSuperLikeById(SuperlikeId);
    if (!SuperLikeExists) {
      throw new Error("SuperLike not found!");
    }
  
    return Banner.findOneAndUpdate(
      { _id: SuperlikeId },
      {
        $set: {
          is_active: !SuperLikeExists.is_active,
        },
      },
      { new: true }
    );
  };
  
module.exports = {
  createSuperLike,
  getSuperLikeList,
  getSuperLikeById,
  updateSuperLike,
  deleteSuperLike,
  manageSuperLikeStatus
};