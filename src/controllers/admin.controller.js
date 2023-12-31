const { adminService, emailService, verifyOtpService } = require("../services");

// Get admin list
const getAdminList = async (req, res) => {
  try {
    const adminList = await adminService.getAdminList();
    if (!adminList) {
      throw new Error("Admin list data not found ...! ");
    }
    res.status(200).json({
      success: true,
      message: "Get admin list successfully ...! ",
      data: adminList,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update admin
const updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const reqBody = req.body;
    const adminExist = await adminService.getAdminById(adminId);
    if (!adminExist) {
      throw new Error("Admin not found!");
    }
    const adminUpdate = await adminService.updateAdmin(adminId, reqBody);
    if (!adminUpdate) {
      throw new Error("Something went wrong, please try again or later...!");
    }
    res.status(200).json({
      succcess: true,
      message: "Admin updated successfully ...! ",
      data: adminUpdate,
    });
  } catch (error) {
    res.status(400).json({
      succcess: false,
      message: error.message,
    });
  }
};
// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const adminExist = await adminService.getAdminById(adminId);
    if (!adminExist) {
      throw new Error("Admin not found!");
    }
    const admin_delete = await adminService.deleteAdmin(adminId);
    if (!admin_delete) {
      throw new Error("Something went wrong, please try again or later...!");
    }
    res.status(200).json({
      succcess: true,
      message: "Admin deleted successfully ...! ",
      data: admin_delete,
    });
  } catch (error) {
    res.status(400).json({
      succcess: false,
      message: error.message,
    });
  }
};

module.exports = {
  // createAdmin,
  getAdminList,
  updateAdmin,
  deleteAdmin,
};