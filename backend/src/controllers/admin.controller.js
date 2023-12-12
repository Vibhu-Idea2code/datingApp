const { adminService, emailService, verifyOtpService,userService } = require("../services");
const otpGenerator = require('otp-generator');
const userHelper = require('../helpers/userHelper');
const ejs = require("ejs");
const path = require("path");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnuki";
const fs = require("fs");
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
    // if (adminExist) {
    //   throw new Error("Admin not found!");
    // }
    if (req.file) {
      adminExist.admin_image = req.file.filename; // Store the path to the uploaded profile image
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


/* --------------- GET USER LIST  (SIMPLE) WITH AUTH ADMIN SIDE--------------- */
const getAllUser = async (req, res) => {
  try {
    
    const data = await userService.getUserList();
    // const result=await userService.getUserListSearch()
    res.status(200).json({
      success: true,
      message: "User list successfully!",
      data: { data },
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

const updateDetails = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      first_name,
      last_name,
      gender,
      sexual,
      school,
      interest,
      sign,
      pets,
      address,
      maxDistance,
      jobTitle,
      email,
      phoneNumber,
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);
console.log(userExists)
    // if (!userExists) {
    //   throw new Error("User not found!");
    // }
    if (req.file) {
      userExists.user_img = req.file.filename; // Store the path to the uploaded profile image
    }
    // Update the user's gender and other details
    userExists.gender = gender; // Update the 'gender' field
    userExists.first_name = first_name; // Update the 'firstName' field
    userExists.address = address; // Update the 'lastName' field
    userExists.phoneNumber = phoneNumber; // Update the 'phoneNumber'
    userExists.last_name = last_name; // Update the 'firstName' field
    userExists.sexual = sexual; // Update the 'firstName' field
    userExists.school = school; // Update the 'firstName' field
    userExists.interest = interest; // Update the 'firstName' field
    userExists.sign = sign; // Update the 'firstName' field
    userExists.pets = pets; // Update the 'firstName' field
    userExists.maxDistance = maxDistance; // Update the 'firstName' field
    userExists.jobTitle = jobTitle; // Update the 'firstName' field
    userExists.email = email; // Update the 'firstName' field
   
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({  
      success: true,
      message: "User details updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const register = async (req, res) => {
  // const { email, password, role } = req.body;

  console.log(req.body);
  const reqBody = req.body;
  const existingUser = await userService.findUserByEmail(reqBody.email);

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this email already exists.",
    });
  }
  if (req.file) {
    reqBody.user_img = req.file.filename;
  } else {
    throw new Error("Product image is required!");
  }
   // Validate that at least 3 out of 5 interests are provided
   if (!reqBody.interest || reqBody.interest.length < 3) {
    throw new Error("At least 3 out of 5 interests are required.");
  }

   // Validate that at least 3 out of 5 sexual are provided
   if (!reqBody.sexual || reqBody.sexual.length < 3) {
    throw new Error("At least 3 out of 5 sexual are required.");
  }


  if (!reqBody.birthDate) {
    throw new Error("Birthdate is required for age calculation.");
  }

  // Use helper to calculate age
  const age = userHelper.calculateAge(reqBody.birthDate);
 
  let option = {
    email: reqBody.email,
    role: reqBody.role,
    exp: moment().add(1, "days").unix(),
  };

  const token = await jwt.sign(option, jwtSecrectKey);

  const filter = {
    ...reqBody,
    email:reqBody.email,
    gender: reqBody.gender,
    interest:reqBody.interest,
    birthDate:reqBody.birthDate,
    sexual :reqBody.sexual,
    showMe:reqBody.showMe,
    school:reqBody.school,
    sign:reqBody.sign,
    pets:reqBody.pets,
    address:reqBody.address,
    lat:reqBody.lat,
    long:reqBody.long,
    maxAge:reqBody.maxAge,
    minAge:reqBody.minAge,
    maxDistance:reqBody.maxDistance,
    first_name:reqBody.first_name,
    last_name:reqBody.last_name,
    phoneNumber:reqBody.phoneNumber,
    jobTitle:reqBody.jobTitle,
    // age:reqBody.age,
    age,
    token,
  };

  const data = await userService.createUser(filter);

  res.status(200).json({ success: true, data: data });
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }

    await userService.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: "User delete successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------- DELETE MANY USER BY ID ------------------------- */
const deleteManyUsers = async (req, res) => {
  try {
    const { _id } = req.body;
    const result = await User.deleteMany({ _id: { $in: _id } });
    if (result.deletedCount === 0) {
      throw new Error("No users deleted");
    }
    return res.status(200).send({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      message: `${err}`,
    });
  }
};


module.exports = {
  // createAdmin,
  getAdminList,
  updateAdmin,
  deleteAdmin,
  getAllUser,updateDetails,register,deleteUser,deleteManyUsers
};