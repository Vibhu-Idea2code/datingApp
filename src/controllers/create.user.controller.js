const { userService } = require("../services");
const ejs = require("ejs");
const path = require("path");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnuki";
const fs = require("fs");
const User = require("../models/users.model");
const otpGenerator = require('otp-generator');
const userHelper = require('../helpers/userHelper');

const createApi = async (req, res) => {
  try {
    const {first_name,last_name} = req.body;
    const user = await userService.createUser({first_name,last_name});
    if (!user) {
      throw new Error("Something went wrong, please try again or later!");
    }

    res.status(200).json({
      success: true,
      message: "User create successfully!",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports={
  createApi,
}