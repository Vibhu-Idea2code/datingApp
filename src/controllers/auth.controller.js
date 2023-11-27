const { userService, emailService, verifyOtpService } = require("../services");
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

/* -------------------------- REGISTER/CREATE USER -------------------------- */
const register = async (req, res) => {
  // const { email, password, role } = req.body;
  console.log(req.body);
  const reqBody = req.body;
  // if (req.file) {
  //   reqBody.profile_img = req.file.filename;
  // } else {
  //   throw new Error("Product image is required!");
  // }
  if (!reqBody.birthDate) {
    throw new Error("Birthdate is required for age calculation.");
  }

  // Use helper to calculate age
  const age = userHelper.calculateAge(reqBody.birthDate);

  const existingUser = await userService.findUserByEmail(reqBody.email);

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this email already exists.",
    });
  }

  // const hashPassword = await bcrypt.hash(reqBody.password, 8);

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



/* -------------------------- LOGIN/SIGNIN USER -------------------------- */
const loginEmail = async (req, res) => {
  try {
    // validation;
    
    const reqBody = req.body;
    const { email,lat1,long1 } = req.body;
    console.log(req.body);
    const findUser = await userService.findUserByLogonEmail({email} );
    console.log(findUser, "++++");
    if (!findUser) throw Error("User not found");

    if (lat1 !== undefined && long1 !== undefined) {
      findUser.lat = lat1;
      findUser.long = long1;
      await findUser.save(); // Save the changes to the database
    }
    let option = {
      email,
     
      exp: moment().add(1, "days").unix(),
    };
    let token;
    if (findUser) {
      token = await jwt.sign(option,jwtSecrectKey);
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
const checkUserPh = async (req, res) => {
  try {
    // const reqBody = req.body;
    const { phoneNumber } = req.body;
    // console.log(req.body);
    const findUser = await userService.getUserByPhoneNumber(phoneNumber );
    console.log(findUser, "++++");
    if (!findUser) throw Error("User not found");
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);   
    // const otp = Math.floor(1000 + Math.random() * 3000);
    findUser.otp = otp;
    findUser.expireOtpTime = Date.now() + 300000; //Valid upto 5 min
    await findUser.save();

    res.json({ message: `OTP sent successfully ${otp}` });
  } catch (err) {
    next(err);
  }
};  

/* ------------------------------- VERIFY OTP with number------------------------------- */
const verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const user = await verifyOtpService.findOtpByOtp({ otp });
    console.log("user", user);
    if (!user) {
      throw new Error("Invalid OTP entered!");
    }
    const findEmail = await verifyOtpService.findOtpByEmail({ phoneNumber });
    console.log("findEmail", findEmail);
    if (!findEmail) {
      throw new Error("User not found");
    }
    findEmail.otp = otp;
    await findEmail.save();
    if (findEmail.otp === otp) {
      return res.status(200).json({
        success: true,
        message: "your otp is right thank you",
        data: user,
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const checkUserOtp = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ otp: req.body.otp, mo_no: req.body.mo_no });
//     if (!user) return queryErrorRelatedResponse(req, res, 401, "Invalid OTP!");

//     if (new Date(user.expireOtpTime).toTimeString() <= new Date(Date.now()).toTimeString()) {
//       return queryErrorRelatedResponse(req, res, 401, "OTP is Expired!");
//     }

//     successResponse(res, user);
//   } catch (err) {
//     next(err);
//   }
// };



/* ----------------------------- CHANGE PASSWORD ---------------------------- */
const changePassword = async (req, res) => {
  try {
    const { oldpass, newpass, confirmpass } = req.body;
    console.log(req.body, "++++++++++++++");
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Verify the old password
    const isPasswordCorrect = await bcrypt.compare(oldpass, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect old password" });
    }
    // Check if the new password and confirm password match
    if (newpass !== confirmpass) {
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
    }
    // Hash the new password and update it in the database
    const hashedPassword = await bcrypt.hash(newpass, 10);
    user.password = hashedPassword;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ----------------------------- FORGOT PASSWORD ---------------------------- */
const forgetPassword = async (req, res) => {
  try {
    const { email, user_name } = req.body;
    const findUser = await userService.findUserByEmail({ email });
    console.log(findUser);
    if (!findUser) throw Error("User not found");
    const otp = ("0".repeat(4) + Math.floor(Math.random() * 10 ** 4)).slice(-4);
    findUser.otp = otp;
    await findUser.save();
    ejs.renderFile(
      path.join(__dirname, "../views/otp-template.ejs"),
      {
        email: email,
        otp: otp,
        user_name: user_name,
      },
      async (err, data) => {
        if (err) {
          let userCreated = await userService.findUserByEmail(email);
          if (userCreated) {
            await userService.deleteUserByEmail(email);
          }
          throw new Error("Something went wrong, please try again.");
        } else {
          emailService.sendMail(email, data, "Verify Email");
        }
      }
    );
    res.status(200).json({
      success: true,
      message: "User login successfully!",
      // data: { data },
      data: `user otp is stored ${otp}`,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ----------------------------- RESET PASSWORD ----------------------------- */
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }
    const user = await userService.findUserByEmail({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 8);
    await userService.updatePassword(user._id, hashPassword);
    // Optionally, you can add more password validation logic here.
    res.status(200).json({
      success: true,
      message: "Password reset successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  // createUser,
  loginEmail,
  verifyOtp,
  forgetPassword,
  resetPassword,
  changePassword,
  checkUserPh
};