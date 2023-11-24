const { User } = require("../models");

const findOtpByEmail = async (phoneNumber) => {
  return await User.findOne(phoneNumber);
};
const findOtpByOtp = async (otp) => {
  return await User.findOne(otp);
};

module.exports = {
  findOtpByEmail,
  findOtpByOtp,
};