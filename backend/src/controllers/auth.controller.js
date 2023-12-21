const { userService, emailService, verifyOtpService } = require("../services");
const ejs = require("ejs");
const path = require("path");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnuki";
const fs = require("fs");
const User = require("../models/users.model");
const otpGenerator = require("otp-generator");
const userHelper = require("../helpers/userHelper");

/* -------------------------- REGISTER/CREATE USER -------------------------- */
const register = async (req, res) => {
  // const { email, password, role } = req.body;
  try {
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
      return res.status(400).json({
        success: false,
        message: "image is required",
      });
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
      // age:reqBody.age,
      age,
      token,
    };

    const data = await userService.createUser(filter);

    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

/* -------------------------- LOGIN/SIGNIN USER -------------------------- */
const loginEmail = async (req, res) => {
  try {
    // validation;
    const reqBody = req.body;
    const { email, lat1, long1 } = req.body;
    console.log(req.body);
    const findUser = await userService.findUserByLogonEmail(reqBody.email);
    console.log(findUser, "++++");
    if (!findUser) throw Error("User not found");

    if (lat1 !== undefined && long1 !== undefined) {
      findUser.lat = lat1;
      findUser.long = long1;
      await findUser.save(); // Save the changes to the database
    }
    let option = {
      email: findUser.email,
      lat1: findUser.lat,
      long1: findUser.long,
      exp: moment().add(1, "day").unix(),
    };
    let token;
    if (findUser) {
      token = await jwt.sign(option, jwtSecrectKey);
    }
    let datas;
    if (token) {
      datas = await userService.findUserAndUpdate(findUser._id, token);
    }

    ejs.renderFile(
      path.join(__dirname, "../views/login-template.ejs"),
      {
        email: reqBody.email,
        // otp: ("0".repeat(4) + Math.floor(Math.random() * 10 ** 4)).slice(-4),
        first_name: reqBody.first_name,
        last_name: reqBody.last_name,
      },
      async (err, data) => {
        if (err) {
          let userCreated = await userService.getUserByEmail(reqBody.email);
          if (userCreated) {
            // await userService.deleteUserByEmail(reqBody.email);
          }
          throw new Error("Something went wrong, please try again.");
        } else {
          emailService.sendMail(reqBody.email, data, "Verify Email");
        }
      }
    );
    res.status(200).json({
      success: true,
      message: "User create successfully!",
      data: { datas },
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/* -------------------------- LOGIN WITH PHONE NUMBER WITH OTP  -------------------------- */
// const checkUserPh = async (req, res, next) => {
//   try {
//     // const reqBody = req.body;
//     const { phoneNumber } = req.body;
//     // console.log(req.body);
//     const findUser = await userService.getUserByPhoneNumber(phoneNumber);
//     console.log(findUser, "++++");
//     // if (!findUser) throw Error("User not found");

//     const otpExpiry = new Date();
//     otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);
//     const otp = Math.floor(1000 + Math.random() * 3000);
//     findUser.otp = otp;
//     findUser.expireOtpTime = Date.now() + 300000; //Valid upto 5 min

//     await findUser.save();

//     res
//       .status(200)
//       .json({ success: true, message: `OTP sent successfully ${otp}` });
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// };

const checkUserPh = async (req, res, next) => {
  try {
    // const reqBody = req.body;
    const { phoneNumber } = req.body;
    // console.log(req.body);
    const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
    if (!phoneRegex.test(phoneNumber)) {
      throw new Error("Invalid phone number format");
    }
    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log(`Generated OTP for ${phoneNumber}: ${otp}`);

    res
      .status(200)
      .json({ success: true, message: `OTP sent successfully ${otp}` });
  } catch (err) {
    res.json({ message: err.message });
  }
};

/* ------------------------------- VERIFY OTP with number------------------------------- */
const verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    const findEmail = await verifyOtpService.findOtpByEmail({ phoneNumber });
    console.log("findEmail", findEmail);
    if (!findEmail) {
      throw new Error("0");
    }
    findEmail.otp = otp;
    await findEmail.save();
    if (findEmail.otp !== otp) {
      throw new Error("Invalid OTP entered!");
    }
    return res.status(200).json({
      success: true,
      message: "your otp is right thank",
      data: findEmail,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  // createUser,
  loginEmail,
  verifyOtp,
  checkUserPh,
};
