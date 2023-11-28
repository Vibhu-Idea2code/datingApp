const { userService } = require("../services");
const { User } = require("../models"); // use in delete many
const distance = require("../helpers/distanceCalculate");
const userHelper = require('../helpers/userHelper');

/* ------------------------ GET USER LIST (ROLE WISE) WITH AUTH ADMIN SIDE----------------------- */
const getUserListRole = async (req, res) => {
  try {
    const getList = await userService.getUserListSimple(req, res);
    const userRole = req.body.role;
    let users = [];
    if (userRole === "user") {
      for (let i = 0; i < getList.length; i++) {
        if (getList[i].role !== "admin") {
          users.push(getList[i]);
        }
      }
      console.log("users users", users);
      res.send(users);
    } else {
      res.send(getList);
    }
  } catch (err) {
    console.log("Error in getting the user list", err);
    res.status(500).send(err);
  }
};

/* ------------------------ GET USER LIST BY DISTANCE ADMIN SIDE----------------------- */
const userList = async (req, res) => {
  try {
    const getUser = await userService.getUserList();
    console.log(getUser[0]);
    var userDetailsData = [];
    for (let i = 0; i < getUser.length; i++) {
      // console.log(getUser[i].first_name, getUser[i].last_name);
      const clientId = getUser[i]._id;
      console.log(clientId)
      var userDetails = {
        first_name: getUser[i].first_name,
        age: getUser[i].age,
        distances: distance(
          getUser[i]._id,     
          37.0902,
          95.7129,
          getUser[i].lat,
          getUser[i].long,
          // getUser[i].lat1,
          // getUser[i].long2,
        ),
      };
      userDetailsData.push(userDetails);
    }
    res.status(200).json({
      success: true,
      message: "user List!",
      data: userDetailsData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* --------------- GET USER LIST ROLE WISE (SIMPLE) WITH AUTH ADMIN SIDE--------------- */
const getAllUser = async (req, res) => {
  try {
    const data = await userService.getAllUser({ role: req.body.role });
    // const result=await userService.getUserListSearch()
    res.status(200).json({
      success: true,
      message: "User list successfully!",
      data: { data },
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/* --------------------------- GET USER LIST BY ID Home page -------------------------- */
const getUserDetails = async (req, res) => {
  try {
    const getDetails = await userService.getUserById(req.params.userId);
    if (!getDetails) {
      throw new Error("User not found!");
    }
    const { first_name,age, maxDistance } = getDetails;
    res.status(200).json({
      success: true,
      message: "User details get successfully!",
      data: {
        first_name,
        age,
        maxDistance,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
 /* ----------------------GET USER DETAILS FOR ADMIN PANEL-----------------------*/

/* -------------------------- GET USER UPDATE BY ID own profile------------------------- */
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

    if (!userExists) {
      throw new Error("User not found!");
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
    // if (req.file) {
    //   userExists.profile_img = req.file.filename; // Store the path to the uploaded profile image
    // }
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

/* -------------------------- GET USER UPDATE BY ID own profile with seeting------------------------- */
// const updateSetting = async (req, res) => {
//   try {
//     // const reqBody=req.body;
//     const userId = req.params.userId;
//     const {
//       showMe,
//       lat,
//       long,
//       ageRange
//       // maxAge,
//       // minAge,
//     } = req.body; // Extract the 'role' and 'gender' fields from the request body
//     const userExists = await userService.getUserById(userId);

//     if (!userExists) {
//       throw new Error("User not found!");
//     }
//     userExists.showMe = showMe; // Update the 'showMe' field
//     userExists.lat = lat; // Update the 'firstName' field
//     userExists.long = long; // Update the 'firstName' field
  
//     const [minAge, maxAge] = ageRange.split('-').map(Number);

//     // Validate if both minAge and maxAge are valid numbers
//     if (!isNaN(minAge) && !isNaN(maxAge)) {
//       userExists.minAge = minAge;
//       userExists.maxAge = maxAge;
//     } else {
//       throw new Error("Invalid age range format");
//     }
//     // if (req.file) {
//     //   userExists.profile_img = req.file.filename; // Store the path to the uploaded profile image
//     // }
//     await userService.updateUser(userId, userExists); // Save the updated user
//     res.status(200).json({
//       success: true,
//       message: "User details updated successfully!",
//       data: userExists
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

/* ------------------------ DELETE SINGLE USER BY ID ------------------------ */
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
  getAllUser,
  getUserListRole,
  
  getUserDetails,
  updateDetails,
  deleteUser,
  deleteManyUsers,
  userList,
  // updateSetting
};
