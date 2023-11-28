const User = require("../models/users.model");

const getUserById = async (userId) => {
    return User.findById(userId);
  };
  const updateDetailsInte = async (userId, updateBody) => {
    return User.findByIdAndUpdate(userId, { $set: updateBody }).populate({
        path: "hobbies",
        select: ["_id"],
      });;
  };

  const getInterestById = async (userId) => {
    return Product.findOne({ _id: userId })
  };
  module.exports = {
    getUserById,   
    updateDetails,
    getInterestById
    };