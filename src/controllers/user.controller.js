const { userService } = require("../services");
const { User } = require("../models"); // use in delete many
const distance = require("../helpers/distanceCalculate");

/* ------------------------ GET USER LIST (ROLE WISE) WITH AUTH ----------------------- */
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
      console.log("users", users);
      res.send(users);
    } else {
      res.send(getList);
    }
  } catch (err) {
    console.log("Error in getting the user list", err);
    res.status(500).send(err);
  }
};

/* -------------- GET USER LIST WITH SIMPLE AUTH AND PAGINATION ------------- */
// const getUserList = async (req, res) => {
//   try {
//     const { search, page, perPage, ...options } = req.query;
//     let filter = {};

//     if (search) {
//       filter.user_name = { $regex: search, $options: "i" };
//     }

//     const currentPage = parseInt(page) || 1;
//     const itemsPerPage = parseInt(perPage) || 3;

//     // Calculate the number of documents to skip based on the current page and items per page
//     const skip = (currentPage - 1) * itemsPerPage;

//     const userList = await userService.getUserList(filter, {
//       skip: skip,
//       limit: itemsPerPage,
//       ...options, // You can pass other query options here
//     });

//     res.status(200).json({
//       success: true,
//       message: "Get user list successfully!",
//       data: userList,
//       currentPage: currentPage,
//       totalPages: Math.ceil(userList.length / itemsPerPage),
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };
const getUserList = async (req, res) => {
  try {
    const { search, page, perPage, ...options } = req.query;
    console.log(req.query);
    let filter = {};

    if (search) {
      filter.user_name = { $regex: search, $options: "i" };
    }
    console.log(search, "search");
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(perPage) || 10; // Adjust the default items per page as needed

    const skip = (currentPage - 1) * itemsPerPage;

    const userList = await userService.getUserList(filter, {
      skip: skip,
      limit: itemsPerPage,
      ...options,
    });

    res.status(200).json({ userList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userList = async (req, res) => {
  try {
    const getUser = await userService.getUserList();
    console.log(getUser[0]);
    var userDetailsData = [];
    for (let i = 0; i < getUser.length; i++) {
      // console.log(getUser[i].first_name, getUser[i].last_name);
      var userDetails = {
        first_name: getUser[i].first_name,
        last_name: getUser[i].last_name,
        email: getUser[i].email,
        phoneNumber: getUser[i].phoneNumber,
        lat: getUser[i].lat,
        long: getUser[i].long,
        distances: distance(
          37.0902,
          95.7129,
          getUser[i].lat,
          getUser[i].long,
          
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

/* --------------- GET USER LIST ROLE WISE (SIMPLE) WITH AUTH --------------- */
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

/* --------------------------- GET USER LIST BY ID -------------------------- */
const getUserDetails = async (req, res) => {
  try {
    const getDetails = await userService.getUserById(req.params.userId);
    if (!getDetails) {
      throw new Error("User not found!");
    }

    res.status(200).json({
      success: true,
      message: "User details get successfully!",
      data: getDetails,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* -------------------------- GET USER UPDATE BY ID ------------------------- */
const updateDetails = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      first_name,
      last_name,
      gender,
      sexual,
      showMe,
      school,
      interest,
      sign,
      pets,
      address,
      lat,
      long,
      maxAge,
      minAge,
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
    userExists.showMe = showMe; // Update the 'firstName' field
    userExists.school = school; // Update the 'firstName' field
    userExists.interest = interest; // Update the 'firstName' field
    userExists.sign = sign; // Update the 'firstName' field
    userExists.pets = pets; // Update the 'firstName' field
    userExists.address = first_name; // Update the 'firstName' field
    userExists.lat = lat; // Update the 'firstName' field
    userExists.long = long; // Update the 'firstName' field
    userExists.maxAge = maxAge; // Update the 'firstName' field
    userExists.minAge = minAge; // Update the 'firstName' field
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
  getUserList,
  getUserDetails,
  updateDetails,
  deleteUser,
  deleteManyUsers,
  userList,
};
