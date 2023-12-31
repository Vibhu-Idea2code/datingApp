// const Category = require("../models/category.model");
const User = require("../models/users.model");

/**
 * Create user
 * @param {object} reqBody
 * @returns {Promise<User>}
 */
const createUser = async (first_name,last_name) => {
  return User.create(first_name,last_name);
};

/**
 * Get user list
 * @param {object} filter
 * @param {object} options
 * @returns {Promise<User>}
 */
const getUserList = async (filter, options) => {
  return User.find();
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const getUserByPhone=async (phoneNumber)=>{
  return User.findOne({phoneNumber});
}
const findUserByEmail = async (email) => {
  return await User.findOne({email});
};
const findOtpByOtp = async (otp) => {
  return await User.findOne(otp);
};
/**
 * Get user details by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
// const getUserById = async (userId) => {
//   return User.findById(userId);
// };
const getUserById = async (userId) => {
  return User.findById(userId);
};


/**
 * user details update by id
 * @param {ObjectId} userId
 * @param {object} updateBody
 * @returns {Promise<User>}
 */
const updateDetails = async (userId, updateBody) => {
  return User.findByIdAndUpdate(userId, { $set: updateBody });
};

/**
 * Delete user
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUser = async (userId) => {
  
  return User.findByIdAndDelete(userId);
};

const deleteUserByEmail = async (email) => {
  return User.findOneAndDelete({ email: email });
};

const getUserByPhoneNumber = async (phoneNumber) => {
  return User.findOne({ phoneNumber });
};

const findUserByLogonEmail = async (email) => {
  return await User.findOne({email});
};
const updateUser = async (userId, updateBody) => {
  return User.findByIdAndUpdate(userId, { $set: updateBody });
};
const findUserAndUpdate = async (_id, token) => {
  return await User.findByIdAndUpdate(
    { _id },
    {
      $set: { token },
    },
    { new: true }
  );
};

const getUserListSimple = async (req, res) => {
  return User.find();
};
const getAllUser = async (role) => {
  return await User.find(role);
};

const updateDetailsInte = async (userId, updateBody) => {
  return User.findByIdAndUpdate(userId, { $set: updateBody }).populate({
      path: "interest",
      select: ["_id"],
    });
};
module.exports = {
  createUser,
  getUserList,
  getUserById,
  updateDetails,
  getUserByEmail,
  deleteUser,
  deleteUserByEmail,
  getUserByPhoneNumber,
  findUserByLogonEmail,
  findUserAndUpdate,
  getUserByPhone,
  findOtpByOtp,
  findUserByEmail,
  updateUser,
  getUserListSimple,
  getAllUser,
  updateDetailsInte
};