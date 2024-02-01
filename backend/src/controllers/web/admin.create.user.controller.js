const {    userService  } = require("../../services");
  const userHelper = require("../../helpers/userHelper");
  const moment = require("moment");
  const jwt = require("jsonwebtoken");
  const jwtSecrectKey = "cdccsvavsvfssbtybnjnuki";
  const fs = require("fs");
const { User } = require("../../models");
const mongoose = require("mongoose");
const deleteFiles = require("../../helpers/deleteFiles");

/* -------------------------- UPDATE USER BY ADMIN -------------------------- */
  const UserUpdateDetailsByAdmin = async (req, res) => {
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
        nationality,
        plan
      } = req.body; // Extract the 'role' and 'gender' fields from the request body
      const userExists = await userService.getUserById(userId);
      // console.log(userExists);
      // if (!userExists) {
      //   throw new Error("User not found!");
      // }
      // if (req.file) {
      //   userExists.user_img = req.file.filename; // Store the path to the uploaded profile image
      // }
      user_img = [];
      if (req.files) {
        for (let ele of req.files) {
          user_img.push(ele.filename);
        }
      } else {
        throw new Error("user image is required!");
      }
      req.body.user_img = user_img;
  
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
      userExists.user_img = user_img; // Update the 'firstName
      userExists.nationality = nationality; // Update the 'firstName
      userExists.plan = plan; // Update the 'firstName
  
      const baseUrl =
      req.protocol +
      "://" +
      req.get("host") +
      process.env.BASE_URL_PROFILE_PATH;
      await userService.updateUser(userId, userExists); // Save the updated user
  
      res.status(200).json({
        success: true,
        message: "User details updated successfully!",
        data: userExists,
        baseUrl:baseUrl,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  /* -------------------------- CREATE USER BY ADMIN -------------------------- */
  const UserRegisterByAdmin = async (req, res) => {
    // const { email, password, role } = req.body;
    try {
      const reqBody = req.body;
      const existingUser = await userService.findUserByEmail(reqBody.email);
      if (existingUser) {
        throw new Error("User with this email already exists.");
      }
      
          // if (req.file) {
          //   reqBody.image = req.file.filename;
          // } else {
          //   throw new Error("user image is required!");
          // }
  
      if (!req.files || req.files.length <= 1 || req.files.length >= 7) {
        throw new Error(`Between 2 and 6 images are required.`);
      }

      user_img = [];
      if (req.files) {
        for (let ele of req.files) {
          user_img.push(ele.filename);
        }
      } else {
        throw new Error("user image gallery is required!");
      }
      reqBody.user_img = user_img;
  
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
        email: reqBody.email,
        gender: reqBody.gender,
        interest: reqBody.interest,
        birthDate: reqBody.birthDate,
        sexual: reqBody.sexual,
        showMe: reqBody.showMe,
        school: reqBody.school,
        sign: reqBody.sign,
        pets: reqBody.pets,
        address: reqBody.address,
        lat: reqBody.lat,
        long: reqBody.long,
        maxAge: reqBody.maxAge,
        minAge: reqBody.minAge,
        maxDistance: reqBody.maxDistance,
        first_name: reqBody.first_name,
        last_name: reqBody.last_name,
        phoneNumber: reqBody.phoneNumber,
        jobTitle: reqBody.jobTitle,
        location:reqBody.location,
        ageControl:reqBody.ageControl,
        distanceControl:reqBody.distanceControl,
        image:reqBody.image,
        plan:reqBody.plan,
        nationality:reqBody.nationality,

        // user_img: reqBody.user_img,
        // age:reqBody.age,
        age,
        token,
      };

      const abcd = await userService.createUser(filter);
      res.status(200).json({ success: true, data: abcd });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  };
  
  /* -------------------------- DELETE USER BY ADMIN -------------------------- */
  const deleteUserByAdmin = async (req, res) => {
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
  
  /* ------------------------- DELETE MANY USER BY ADMIN ------------------------- */
  const deleteManyUsersByAdmin = async (req, res) => {
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
      // console.error(err);
      return res.status(500).send({
        success: false,
        message: `${err}`,
      });
    }
  };
  
  /* --------------- GET USER LIST  (SIMPLE) WITH AUTH ADMIN SIDE--------------- */
const getAllUser = async (req, res) => {
    try {
      const data = await userService.getUserList();
      // const result=await userService.getUserListSearch()
      const baseUrl =
        req.protocol +
        "://" +
        req.get("host") +
        process.env.BASE_URL_PROFILE_PATH;
      res.status(200).json({
        success: true,
        message: "User list successfully!",
        data: data,
        baseUrl: baseUrl,
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  const getdashboard = async (req, res) => {
    try {
        // Define age ranges
        const ageRanges = [
            { min: 18, max: 25 },
            { min: 26, max: 30 },
            { min: 31, max: 41 },
            { min: 42, max: 52 },
            { min: 53, max: 63 },
            { min: 64, max: 74 },
            { min: 75, max: Infinity },
            // Add more age ranges as needed
        ];

        // Create an array to store the count and details for each age range and nationality
        const ageRangeDetails = [];

        // Loop through each age range
        for (const range of ageRanges) {
            // Find users within the current age range
            const usersInAgeRange = await User.find({
                age: { $gte: range.min, $lte: range.max },
            });

            // Filter users by nationality if provided
            const filteredUsers = req.query.nationality
                ? usersInAgeRange.filter((user) => user.nationality === req.query.nationality)
                : usersInAgeRange;

            // Filter out users with undefined nationality
            const validUsers = filteredUsers.filter((user) => user.nationality);

            // Group users by nationality and count them
            const nationalityCount = validUsers.length;

            // Calculate percentage
            const totalUsersCount = usersInAgeRange.length;
            const percentage = (nationalityCount / totalUsersCount) * 100;

            // Include user details for users with unique nationality
            const uniqueNationalities = validUsers.map(user => user.nationality);
            const userDetails = await User.find({
                age: { $gte: range.min, $lte: range.max },
                nationality: { $in: uniqueNationalities },
            }, 'nationality');

            // Push the count, percentage, and details to the ageRangeDetails array
            ageRangeDetails.push({
                ageRange: `${range.min}-${range.max}`,
                count: nationalityCount,
                percentage: percentage,
                userDetails: userDetails.map((user) => ({
                    nationality: user.nationality,
                })),
            });
        }

        res.status(200).json({
            success: true,
            message: "User details and age range counts successfully!",
            ageRangeDetails: ageRangeDetails,
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
  
  /* ------------------------------ UPDATE STATUS ----------------------------- */
  const updateUserStatus = async (req, res, next) => {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const user = await User.findById(id);
  
      if (!user) {
        throw new Error("User not found!");
      }  
      user.status = !user.status;
      const result = await user.save();

      res.status(200).json({
        success: true,
        message: "User Status Update successfully!",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

    /* ------------------------------ UPDATE STATUS ----------------------------- */
    const updateUserStatusMange = async (req, res, next) => {
      try {
        const allUsers = await User.find()
        const status = true;
        if (status) {
          res.status(200).json({
            success: true,
            message: "true means block user list",
            data: allUsers, // Include the list of all users in the response
          });
        } else {
          res.status(200).json({
            success: true,
            message: "false means unblock user list",
            data: null,
          });
        }
      } catch (err) {
        next(err);
      }
    };

   /* -------- Delete a multiple banner  or sub banner  with there Id's -------- */

const deleteMultiUser = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);
      const user = await User.findById(id);
      deleteFiles(user.user_img);
      await User.deleteOne({ _id: id });
    });
     
    res.status(200).json({
      success: true,
      message: "All selected users deleted successfully.!",
      // data: result,
    
    });
  } catch (error) {
    next(error);
  }
};
  
 /* ---- API endpoint to get the total count of active and inactive users ---- */

const getStatuswiseUserCount = async (req, res, next) => {
  try {
    const users = await User.find();
    const activeCount = users.filter((user) => user.status).length;
    const inactiveCount = users.length - activeCount;

    const result = { activeCount: activeCount, inactiveCount: inactiveCount };
    res.status(200).json({
      success: true,
      message: "stus is succefully!",
      data: result,
    
    });
  } catch (error) {
    next(error);
  }
};

  module.exports = {
    UserUpdateDetailsByAdmin,
    UserRegisterByAdmin,
    deleteUserByAdmin,
    deleteManyUsersByAdmin,
    getAllUser,
    updateUserStatus,
    deleteMultiUser,
    updateUserStatusMange,
    getStatuswiseUserCount,
   getdashboard,
  };
  