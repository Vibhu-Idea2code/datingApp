const { userService } = require("../../services");
// const { User } = require("../models"); // use in delete many
// const distance = require("../helpers/distanceCalculate");
const userHelper = require("../../helpers/userHelper");

/* -------------------- UPDATE PHONE NUMBER USING USER ID ------------------- */
const updatePhone = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const { phoneNumber } = req.body; // Extract  'PHONENUMBER' fields from the request body
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    userExists.phoneNumber = phoneNumber; // Update the 'phoneNumber'
    await userService.updateUser(userId, userExists); // Save the updated user
    res.status(200).json({
      success: true,
      message: "User phone Number updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* -------------------- UPDATE MAX-MIN-AGE USING USER ID -------------------- */
const updateMaxMinAge = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { ageRange } = req.body; //  'AGERANGE' fields from the request body
    const userExists = await userService.getUserById(userId);

    if (!userExists) {
      throw new Error("User not found!");
    }
    const [minAge, maxAge] = ageRange.split("-").map(Number);
    // Validate if both minAge and maxAge are valid numbers
    if (!isNaN(minAge) && !isNaN(maxAge)) {
      userExists.minAge = minAge;
      userExists.maxAge = maxAge;
    } else {
      throw new Error("Invalid age range format");
    }
    const result = await userService.updateUser(userId, userExists); // Save the updated user
    res.status(200).json({
      success: true,
      message: "User age range like min and max age updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/* ---------------------- UPDATE MAX-DISTANCE USING ID ---------------------- */
const updateMaxDistance = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { maxDistance } = req.body; //  'MAX-DISTANCE' fields from the request body
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    // Update the 'maxDistance' property
    userExists.maxDistance = maxDistance;
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User max distance updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/* ---------------------- UPDATE SHOW ME USING USER ID ---------------------- */
// 0-men,
// 1-women,
// 2-all
const updateShowMe = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { showMe } = req.body; // 'SHOW ME' fields from the request body
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    // Update the 'show me(gender)' property based on the input
    // if user input 2 then show all men and women,if user input 1 then show only women,if user input 0 then show men that type of validation set
    if (showMe === "2") {
      // Allow both "0" and "1" when gender is "2" (everyone)
      userExists.showMe = showMe;
    } else if (showMe === "0") {
      // Set "1" if gender is "0" (men)
      userExists.showMe = "0";
    } else if (showMe === "1") {
      // Set "0" if gender is "1" (women)
      userExists.showMe = "1";
    } else {
      throw new Error("Invalid showMe value!");
    }
    // Save the updated user
    const result = await userService.updateUser(userId, userExists);
    res.status(200).json({
      success: true,
      message: "User showMe gender updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/* ----------------------- UPDATE GENDER USING USER ID ---------------------- */
// 0-men,
// 1-woman,
// 2-other
const updateGender = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { gender } = req.body; // 'gender' fields from the request body
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    // Update the 'gender' property based on the input
    // if user input 2 then other gender,if user input 1 then gender is women,if user input 0 then gender is men that type of validation set
    if (gender === "2") {
      // Allow both "0" and "1" when gender is "2" (everyone)
      userExists.gender = "2";
    } else if (gender === "0") {
      // Set "1" if gender is "0" (men)
      userExists.gender = "0";
    } else if (gender === "1") {
      // Set "0" if gender is "1" (women)
      userExists.gender = "1";
    } else {
      throw new Error("Invalid gender value!");
    }
    // Save the updated user
    const result = await userService.updateUser(userId, userExists);
    res.status(200).json({
      success: true,
      message: "User gender updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/* ---------------------- UPDATE ABOUT ME USING USER ID --------------------- */
const updateAboutMe = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { aboutMe } = req.body; //  'aboutMe' fields from the request body
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    // FIXE UP  TO 500 CHARACTERS that type of validation set
    if (aboutMe && aboutMe.length > 500) {
      throw new Error("AboutMe should not exceed 500 characters!");
    }
    userExists.aboutMe = aboutMe; // Update the 'aboutMe'
    await userService.updateUser(userId, userExists); // Save the updated user
    res.status(200).json({
      success: true,
      message: "User aboutMe updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/* --------------------- UPDATE JOB-TITLE USING USER ID --------------------- */
const updateJobTitle = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { jobTitle } = req.body; //  'jobTitle' fields from the request body
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    userExists.jobTitle = jobTitle; // Update the 'jobTitle'
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User jobTitle updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/* -------------------- UPDATE COMPANY NAME USING USER ID ------------------- */
const updateCompany = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { company } = req.body; // 'company' fields from the request body
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    userExists.company = company; // Update the 'company'
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User company updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/* -------------------- UPDATE SCHOOL NAME USING USER ID -------------------- */
const updateSchool = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { school } = req.body; //'school' fields from the request body
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    userExists.school = school; // Update the 'school'
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User school updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/* ---------------------- UPDATE ADDRESS USING USER ID ---------------------- */
const updateAddress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { address } = req.body; // 'address' fields from the request body
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    userExists.address = address; // Update the 'address'
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User address updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/* --------------------- UPDATE LIVING ID USING USER ID --------------------- */
const updateLivingIn = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { city } = req.body; // 'city' fields from the request body
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    userExists.city = city; // Update the 'city'
    await userService.updateUser(userId, userExists); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User address updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/* --------------------- UPDATE FIRST NAME USING USER ID -------------------- */
const updateFirstName = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { first_name, last_name } = req.body; //'first_name & last_name ' fields from the request body
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    userExists.first_name = first_name;
    userExists.last_name = last_name;
    await userService.updateUser(userId, userExists); // Save the updated user
    res.status(200).json({
      success: true,
      message: "User firs and last name updated successfully!",
      data: userExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/* ------------------ UPDATE HOBBIES/INTERSET USING USER ID ----------------- */
const updateInterest = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { interest } = req.body; //'interest' fields from the request body
    //  user input atleast min 3 value
    if (interest.length < 3) {
      throw new Error("At least 3 out of 5 interests are required.");
    }
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    userExists.interest = interest; // Update the 'interest'
    await userService.updateDetailsInte(userId, userExists); // Save the updated user
    res.status(200).json({
      success: true,
      message: "User interest updated successfully!",
      data: interest,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------ UPDATE HOBBIES/INTERSET USING USER ID ----------------- */
const updateSign = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { sign } = req.body; //'interest' fields from the request body
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    userExists.sign = sign; // Update the 'interest'
    await userService.updateDetailsSign(userId, userExists); // Save the updated user
    res.status(200).json({
      success: true,
      message: "User sign updated successfully!",
      data: sign,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------ UPDATE HOBBIES/INTERSET USING USER ID ----------------- */
const updatePets = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { pets } = req.body; //'interest' fields from the request body

    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    userExists.pets = pets; // Update the 'interest'
    await userService.updateDetailsPets(userId, userExists); // Save the updated user
    res.status(200).json({
      success: true,
      message: "User pets updated successfully!",
      data: pets,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------ UPDATE HOBBIES/INTERSET USING USER ID ----------------- */
const updateSexual = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { sexual } = req.body; //'interest' fields from the request body

    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found!");
    }
    userExists.sexual = sexual; // Update the 'interest'
    await userService.updateDetailsSexualOrientation(userId, userExists); // Save the updated user
    res.status(200).json({
      success: true,
      message: "User sexual orinetation updated successfully!",
      data: sexual,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  updatePhone,
  updateMaxDistance,
  updateMaxMinAge,
  updateGender,
  updateShowMe,
  updateAboutMe,
  updateJobTitle,
  updateCompany,
  updateSchool,
  updateLivingIn,
  updateAddress,
  updateFirstName,
  updateInterest,
  updateSign,
  updatePets,
  updateSexual,
};
