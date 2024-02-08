const { User,Admin } = require("../models");

const findOtpByEmail = async ({phoneNumber}) => {
  return await User.findOne({phoneNumber});
};
const findOtpByOtp = async (otp) => {
  return await User.findOne(otp);
};
const findOtpByOtpAdmin = async (otp) => {
  return await Admin.findOne(otp);
};
const findOtpByEmailAdmin = async (email) => {
  return await Admin.findOne(email);
};
const updateVerifyStatusAdmin=async(_id,otp)=>{
  return await Admin.findByIdAndUpdate({_id},{$set:{otp}},{new:true})
}
module.exports = {
  findOtpByEmail,
  findOtpByOtp,
  findOtpByOtpAdmin,
  findOtpByEmailAdmin,
  updateVerifyStatusAdmin
};