const {
  userService,
  emailService,
  verifyOtpService,
} = require("../../services");
const ejs = require("ejs");
const path = require("path");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnuki";
const fs = require("fs");
const User = require("../../models/users.model");
const otpGenerator = require("otp-generator");
const userHelper = require("../../helpers/userHelper");

/* -------------------------- REGISTER/CREATE USER -------------------------- */
const register = async (req, res) => {
  // const { email, password, role } = req.body;
  try {
    // console.log(req.body);
    const reqBody = req.body;
    const existingUser = await userService.findUserByEmail(reqBody.email);
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }
    if (!req.files || req.files.length < 2 || req.files.length > 6) {
      throw new Error(`Between 2 and 6 images are required.`);
    }
    user_img = [];
    if (req.files) {
      for (let ele of req.files) {
        user_img.push(ele.filename);
      }
    } else {
      throw new Error("user image is required!");
    }
    reqBody.user_img = user_img;
    // Validate that at least 3 out of 5 interests are provided
    if (
      !reqBody.interest ||
      reqBody.interest.length < 3 ||
      reqBody.interest.length >= 5
    ) {
      throw new Error("Between 3 and 5 interest are required.");
    }
    // Validate that at least 3 out of 5 sexual are provided
    if (!reqBody.sexual || reqBody.sexual.length > 3) {
      throw new Error("select up to 3 sexual orientation");
    }
    if (!reqBody.birthDate) {
      throw new Error("Birthdate is required for age calculation.");
    }
    // Use helper to calculate age
    const age = userHelper.calculateAge(reqBody.birthDate);

    if (reqBody.plan) {
      // Assuming reqBody.plan contains information about the purchased plan
      const planStartDate = new Date(); // Current date
      const planEndDate = moment(planStartDate).add(reqBody.plan.days, 'days'); // Adjust based on plan details

      // Update reqBody with plan dates
      reqBody.startDatePlan = planStartDate;
      reqBody.endDatePlan = planEndDate;
    }

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
      user_img: reqBody.user_img, 
      plan:reqBody.plan,
      startDatePlan: reqBody.startDatePlan,
      endDatePlan: reqBody.endDatePlan,
      countryCode:reqBody.countryCode,
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
    const { email } = req.body;
    // console.log(req.body);
    const findUser = await userService.findUserByLogonEmail(reqBody.email);
    // console.log(findUser, "++++");
    // console.log(__dirname,"dgfsdsgd")
    if (!findUser) {
      ejs.renderFile(
        path.join(__dirname, "../../views/login-template-nouser.ejs"),
        {
          email: reqBody.email,
          // otp: ("0".repeat(4) + Math.floor(Math.random() * 10 ** 4)).slice(-4),
          first_name: reqBody.first_name,
          last_name: reqBody.last_name,
        },
        async (err, data) => {
          if (err) {
            // throw new Error("Something went wrong, please try again.");
          } else {
            emailService.sendMail(reqBody.email, data, "Verify Email");
          }
        }
      );
    } else {
      ejs.renderFile(
        path.join(__dirname, "../../views/login-template.ejs"),
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
            // throw new Error("Something went wrong, please try again.");
          } else {
            emailService.sendMail(reqBody.email, data, "Verify Email");
          }
        }
      );
    }
    res.status(200).json({
      success: true,
      message: "send mail successfully",
      data: { findUser },
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
    // console.log("findEmail", findEmail);
    if (!findEmail) {
      throw new Error("user not found");
    }
    findEmail.otp = otp;
    await findEmail.save();
    if (findEmail.otp != otp) {
      throw new Error("Invalid OTP entered!");
    }

    // let option = {
    //   phoneNumber,
    //   exp: moment().add(1, "days").unix(),
    // };
    const payload = {
      phoneNumber: findEmail.phoneNumber,
     
      };
 
      const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1m",
      });

      findEmail.token = token;
      const refreshToken = await jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET_KEY
      );
      const output = await findEmail.save();
      const baseUrl =
      req.protocol +
      "://" +
      req.get("host") +
      process.env.BASE_URL_PROFILE_PATH;

    // let data;
    // if (token) {
    //   data = await userService.findUserAndUpdate(findEmail._id, token);
    // }

    return res.status(200).json({
      success: true,
      message: "your otp is right thank",
      data: output,
      token: token,
      refreshToken: refreshToken,
      baseUrl: baseUrl,
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
