const { Like } = require("../models");

/**create Like */
const createLike = async (reqBody) => {
  return Like.create(reqBody);
};
/**get Like list */
const getLikeList = async (filter, options) => {
 return Like.find();
};

/**get Like details by id */
const getLikeById = async (likeId) => {
  return Like.findById(likeId);
};

/**update Like and token */
const updateLike = async (likeId, updateBody) => {
  return Like.findByIdAndUpdate(likeId, { $set: updateBody });
};

/**delete Like */
const deleteLike = async (likeId) => {
  return Like.findByIdAndDelete(likeId);
};
/**
 * Manage product status
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const manageLikeStatus = async (likeId) => {
    const LikeExists = await getLikeById(likeId);
    if (!LikeExists) {
      throw new Error("like not found!");
    }
  
    return Banner.findOneAndUpdate(
      { _id: likeId },
      {
        $set: {
          is_active: !LikeExists.is_active,
        },
      },
      { new: true }
    );
  };
  
module.exports = {
  createLike,
  getLikeList,
  getLikeById,
  updateLike,
  deleteLike,
  manageLikeStatus
};