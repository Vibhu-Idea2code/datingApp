const Admin = require("../models/admin.model");

/**create Admin */
const createAdmin = async (reqBody) => {
  return Admin.create(reqBody);
};
/**get Admin list */
const getAdminList = async (filter, options) => {
 return Admin.find();
};
// const getAdminList=async(filter,options)=>{

// }
const getAdminListSimple = async (req, res) => {
  return Admin.find();
};
// const getAdminListSearch =  async (req,res) => {
//   return Admin.find(req.query);
//  };
const getAllAdmin = async (role) => {
  return await Admin.find(role);
};
/**get Admin details by id */
const getAdminById = async (adminId) => {
  return Admin.findById(adminId);
};
const updateUserRefreshToken = async (adminId, refreshToken) => {
  return await Admin.findByIdAndUpdate(adminId, { refreshToken }, { new: true });
};
/**update Admin and token */
const updateAdmin = async (adminId, updateBody) => {
  return Admin.findByIdAndUpdate(adminId, { $set: updateBody });
};
const findAdminAndUpdate = async (_id, token) => {
  return await Admin.findByIdAndUpdate(
    { _id },
    {
      $set: { token },
    },
    { new: true }
  );
};
/**delete Admin */
const deleteAdmin = async (adminId) => {
  return Admin.findByIdAndDelete(adminId);
};
/**email by Admin */
const findAdminByEmail = async ({email}) => {
  return await Admin.findOne(email);
};
const findAdminByEmailForgot = async (email) => {
  return await Admin.findOne({email});
};
const findAdminByLogonEmail = async (email) => {
  return await Admin.findOne(email);
};
const findByEmail = async (email) => {
  return await Admin.findOne({ email });
};
/**find by otp */
const findAdminByOtp = async (otp) => {
  return await Admin.findOne(otp);
};
/**delete Admin */
const deleteAdminByEmail = async (email) => {
  return Admin.findOneAndDelete({ email: email });
};
/**Admin update */
const updatePassword = async (adminId, newPassword) => {
  return Admin.findByIdAndUpdate(adminId, { password: newPassword });
};
module.exports = {
  createAdmin,
  getAdminList,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  findAdminByOtp,
  findAdminByEmail,
  deleteAdminByEmail,
  findAdminAndUpdate,
  findByEmail,
  updatePassword,
  getAllAdmin,
  getAdminListSimple,
  findAdminByLogonEmail,
  findAdminByEmailForgot,
  updateUserRefreshToken
  // getAdminListSearch
};