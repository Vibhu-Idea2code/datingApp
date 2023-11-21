const { User } = require("../models");

const createUser = async (reqBody) => {
  return User.create(reqBody);
};

const getUserList = async (req, res) => {
  return User.find();
};

const getUserId = async (userId) => {
  return User.findById(userId);
};

const deleteUserId = async (userId) => {
  return User.findByIdAndDelete(userId);
};

const updateUser = async (userId, updateBody) => {
  return await User.findByIdAndUpdate(
    userId,
    { $set: updateBody },
    { new: true }
  );
};
const findUserByLogonEmail = async (email) => {
  return await User.findOne(email);
};
const findUserByEmail = async ({email}) => {
  return await User.findOne(email);
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
module.exports = {
  createUser,
  getUserList,
  deleteUserId,
  getUserId,
  updateUser,
  findUserByEmail,
  findUserByLogonEmail,
  findUserAndUpdate
};