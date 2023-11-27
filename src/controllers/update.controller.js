const { userService } = require("../services");
// const { User } = require("../models"); // use in delete many
// const distance = require("../helpers/distanceCalculate");
const userHelper = require('../helpers/userHelper');


const updatePhone = async (req, res) => {
  try {
    // const reqBody=req.body;
    const userId = req.params.userId;
    const {
      phoneNumber,
    } = req.body; // Extract the 'role' and 'gender' fields from the request body
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
module.exports ={
    updatePhone,
}