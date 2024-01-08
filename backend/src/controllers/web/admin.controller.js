const { adminService } = require("../../services");

const path = require("path");
const fs = require("fs");
const { Admin } = require("../../models");
const deleteFiles = require("../../helpers/deleteFiles");

/* ----------------------------- Get admin list ----------------------------- */
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

/* ------------------------------ Update admin ------------------------------ */
// const updateAdmin = async (req, res) => {
//   try {
//     const adminId = req.params.adminId;
//     const reqBody = req.body;
//     const adminExist = await adminService.getAdminById(adminId);
//     // if (adminExist) {
//     //   throw new Error("Admin not found!");
//     // }
//     if (req.file) {
//       adminExist.admin_image = req.file.filename; // Store the path to the uploaded profile image
//     }
//     const adminUpdate = await adminService.updateAdmin(adminId, reqBody);
//     if (!adminUpdate) {
//       throw new Error("Something went wrong, please try again or later...!");
//     }
//     res.status(200).json({
//       succcess: true,
//       message: "Admin updated successfully ...! ",
//       data: adminUpdate,
//     });
//   } catch (error) {
//     res.status(400).json({
//       succcess: false,
//       message: error.message,
//     });
//   }
// };

//Update Admin Profile
const updateAdmin = async (req, res, next) => {
  try {
    const { admin_name, email } = req.body;
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      throw new Error("Admin not found!"); 
    }
    // return queryErrorRelatedResponse(res, 202, "admin not found.");
    if (req.file) {
            admin.admin_image = req.file.filename; // Store the path to the uploaded profile image
          }
    // if (req.file) {
    //   deleteFiles(admin.admin_image);
    //   admin.admin_image = req.file.filename;
    // }

    admin.admin_name = admin_name;
    admin.email = email;
    const result = await admin.save();

    const baseUrl =
    req.protocol +
    "://" +
    req.get("host") +
    process.env.BASE_URL_PROFILE_PATH;

    const latestRes = {
      admin: result,
      baseUrl: baseUrl,
    };
    res.status(200).json({
            succcess: true,
            message: "Admin updated successfully ...! ",
            data: latestRes,

          });
    // successResponse(res, latestRes);

  } catch (err) {
    next(err);
  }
};
 /* ------------------------------ Delete admin ------------------------------ */
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



const ChangePassword = async (req, res, next) => {
  try {
    const { old_password, new_password, confirm_password } = req.body;

    const admin = await Admin.findById(req.admin._id);
    if (!admin) return queryErrorRelatedResponse(req, res, 404, "Admin not found.");

    const valid_pass = await bcrypt.compare(old_password, admin.password);
    if (!valid_pass) return queryErrorRelatedResponse(req, res, 401, "Invalid Old Password");

    if (new_password != confirm_password) {
      return queryErrorRelatedResponse(req, res, 404, "Confirm password does not match.");
    }

    admin.password = new_password;
    await admin.save();
    successResponse(res, "Password changed successfully!");
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getAdminList,
  updateAdmin,
  deleteAdmin,
};
