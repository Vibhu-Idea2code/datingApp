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
  return User.find()
  .populate({
    path: "interest",
    select: ["_id", "name"],
  }).populate({
    path: "sign",
    select: ["_id", "name"],
  }).populate({
    path: "pets",
    select: ["_id", "name"],
  }).populate({
    path: "sexual",
    select: ["_id", "name"],
  }).populate({
    path: "boost",
    select: ["_id","status"],
  }).populate({
    path: "like",
    select: ["_id", "fromuserid",],
  }).populate({
    path: "plan",
    select: ["_id", "planType",],
  }).populate({
    path: "nationality",
    select: ["_id", "countryCode",],
  });
};

const getUserListDis = async (filter, options) => {
  return User.find() .populate({
    path: "like",
    select: ["_id","first_name"],
  });
};
const getUserListSort = async (filter, options) => {
  // return User.find()
return  User.find({ ...filter, action: "3" }); 
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

// Assuming userService has a method to fetch all users

// const user = await User.findById(userId).
const getUserByIdRef = async (userId) => {
  return User.findById(userId).populate('interest').exec();
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
  return User.findByIdAndUpdate(userId, { $set: updateBody })
  .populate({
      path: "interest",
      select: ["_id"],
    });
};
const updateDetailsSign = async (userId, updateBody) => {
  return User.findByIdAndUpdate(userId, { $set: updateBody })
  .populate({
      path: "sign",
      select: ["_id"],
    });
};

const updateDetailsPets = async (userId, updateBody) => {
  return User.findByIdAndUpdate(userId, { $set: updateBody })
  .populate({
      path: "pets",//aa schema name avse
      select: ["_id"],
    });
};

const updateDetailsSexualOrientation = async (userId, updateBody) => {
  return User.findByIdAndUpdate(userId, { $set: updateBody })
  .populate({
      path: "sexual",//aa schema name avse
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
  updateDetailsInte,
  getUserByIdRef,
  updateDetailsSign,
  updateDetailsPets,
  updateDetailsSexualOrientation,
  getUserListDis,
  getUserListSort
  // getAllUsers
};