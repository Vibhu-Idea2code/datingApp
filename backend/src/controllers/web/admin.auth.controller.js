const {
  adminService,
  emailService,
  verifyOtpService,
} = require("../../services");
// const refreshSecret = "cdccsvavsvfssbtybnjnukiradhe";
const ejs = require("ejs");
const path = require("path");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const jwtSecrectKey = "cdccsvavsvfssbtybnjnuki";
const fs = require("fs");
const Admin = require("../../models/admin.model");
const crypto = require("crypto");
const {
  createResponse,
  queryErrorRelatedResponse,
  successResponse,
} = require("../../helpers/sendResponse");
const refreshSecret = process.env.JWT_REFRESH_SECRET_KEY;
const accessSecret = process.env.JWT_SECRET_KEY;

/* -------------------------- REGISTER/CREATE ADMIN ------------------------- */

const register = async (req, res) => {
  const reqBody = req.body;
  if (req.file) {
    reqBody.admin_image = req.file.filename;
  } else {
    throw new Error("admin image is required!");
  }
  const existingUser = await adminService.findAdminByEmail(reqBody.email);
  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "Admin with this email already exists.",
    });
  }
  const hashPassword = await bcrypt.hash(reqBody.password, 8);
  let option = {
    email: reqBody.email,
    role: reqBody.role,
    exp: moment().add(5, "minute").unix(),
  };
  const token = await jwt.sign(option, jwtSecrectKey);

  /**   generate Refresh Token */
  const generateRefreshToken = (option) => {
    return jwt.sign(option, refreshSecret);
  };
  const refreshToken = generateRefreshToken(option);
  const filter = {
    ...reqBody,
    email: reqBody.email,
    role: reqBody.role,
    password: hashPassword,
    token,
  };

  // const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_PROFILE_PATH;
  const data = await adminService.createAdmin(filter, reqBody);
  res.status(200).json({
    success: true,
    data: data,
    token: token,
    refreshToken: refreshToken,
    // baseUrl:baseUrl,
  });
};

// /* -------------------------- LOGIN/SIGNIN ADMIN -------------------------- */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) throw Error("Admin not not found");

    const successPassword = await bcrypt.compare(password, admin.password);
    if (!successPassword) throw Error("Incorrect password");

    const payload = {
      _id: admin._id,
      email: admin.email,
      };

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1m",
    });

    admin.token = token;
    const refreshToken = await jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET_KEY
    );
    const output = await admin.save();
    const baseUrl =
      req.protocol +
      "://" +
      req.get("host") +
      process.env.BASE_URL_PROFILE_PATH;

    res.status(200).json({
      data: output,
      token: token,
      refreshToken: refreshToken,
      baseUrl: baseUrl,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// const login = async (req, res, next) => {
//   try {
//     const admin = await Admin.findOne({ email: req.body.email });
//     if (!admin){
//       throw Error("User not found");
//     }
//     // return queryErrorRelatedResponse(req, res, 401, { email: "Invalid Username!" });

//     const validatePassword = await bcrypt.compare(req.body.password, admin.password);
//     if (!validatePassword) throw Error("Incorrect password");
//     // return queryErrorRelatedResponse(req, res, 401, { password: "Invalid Password!" });

//     const token = admin.generateAuthToken({ email: req.body.email });
//     admin.remember_token = token;

//     const refresh_token = admin.generateRefreshToken({ email: req.body.email });

//     const output = await admin.save();

//     const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_USER_PATH;

//     const tokens = {
//       token: token,
//       refresh_token: refresh_token,
//       admin: admin,
//       baseUrl: baseUrl,
//     };
//     successResponse(res, tokens);
//   } catch (err) {
//     next(err);
//   }
// };

//Get RefreshToken

// const RefreshToken = async (req, res, next) => {
//   const refreshToken = req.body.refreshToken;

//   if (!refreshToken) {
//     return res.status(402).send("Access Denied. No refresh token provided.");
//   }

//   try {
//     const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);

//     const admin = await Admin.findOne({ email: decoded.email });
//     if (!admin)  throw Error("Invalid Username");

//     const token = admin.generateAuthToken({ email: decoded.email });
//     res.status(200).json({ message: "Password updated successfully!", token: token });
//     // successResponse(res, token);
//   } catch (err) {
//     next(err);
//   }
// };

const RefreshToken = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(402).send("Access Denied. No refresh token provided.");
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      refreshSecret // refresh token key from env
    );

    const admin = await Admin.findOne({ email: decoded.email });

    if (!admin) return res.status(401).send("Invalid Username!");

    const token = jwt.sign(
      { email: decoded.email },
      accessSecret, //access secret key from env
      {
        expiresIn: "2m",
      }
    );
    res.status(200).json({ success: true, refreshToken: token });
  } catch (err) {
    next(err);
  }
};

// /* ------------------------------- VERIFY OTP ------------------------------- */
const verifyOtp = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;
    const user = await verifyOtpService.findOtpByOtpAdmin({ otp });

    if (!user) {
      throw new Error("Invalid OTP entered!");
    }

    // Match new password with confirm password
    if (newPassword !== confirmPassword) {
      throw new Error("New password and confirm password do not match!");
    }

    // Update the user's password in your database (assuming verifyOtpService.updatePassword is a function to update the password)
    await verifyOtpService.updatePassword({ email, newPassword });

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// /* ----------------------------- CHANGE PASSWORD ---------------------------- */
const changePassword = async (req, res) => {
  try {
    const { oldpass, newpass, confirmpass } = req.body;
    console.log(req.body, "++++++++++++++");
    const admin = await Admin.findById(req.admin._id);
    
    if (!admin) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(admin, "++++++++++++++admin");
    // Verify the old password
    const isPasswordCorrect = await bcrypt.compare(oldpass, admin.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect old password" });
    }
    // Check if the new password and confirm password match
    if (newpass != confirmpass) {
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
    }
    // Hash the new password and update it in the database
    const hashedPassword = await bcrypt.hash(newpass, 10);
    admin.password = hashedPassword;
    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// /* ----------------------------- FORGOT PASSWORD ---------------------------- */
const forgetPassword = async (req, res) => {
  try {
    const { email, admin_name } = req.body;
    const findUser = await adminService.findAdminByEmailForgot(email);
    // console.log(findUser);
    if (!findUser) throw Error("User not found");
    let resetCode = crypto.randomBytes(32).toString("hex");
    const otp = ("0".repeat(4) + Math.floor(Math.random() * 10 ** 4)).slice(-4);
    const expireOtpTime = Date.now() + 900000; //Valid upto 15 min
    findUser.otp = otp;
    findUser.resetCode = resetCode;
    findUser.expireOtpTime = expireOtpTime;
    await findUser.save();
    ejs.renderFile(
      path.join(__dirname, "../../views/login-template-admin.ejs"),
      {
        email: email,
        otp: otp,
        otpURL: `http://localhost:3000/reset-password/${resetCode}/${findUser._id}`,
        admin_name: admin_name,
      },
      async (err, data) => {
        // console.log(__dirname)
        if (err) {
          let userCreated = await adminService.findAdminByEmailForgot(email);
          if (userCreated) {
            // await adminService.deleteUserByEmail(email);
          }
          // throw new Error("Something went wrong, please try again.");
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

// /* ----------------------------- RESET PASSWORD ----------------------------- */
const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword, confirmPassword, id } = req.body;

    console.log(id);

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }
    const user = await adminService.findAdminByEmail(otp);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Verify OTP
    const checkotp = await Admin.findOne({
      otp: req.body.otp,
      _id: req.body.id,
    });
    if (!checkotp)
      return queryErrorRelatedResponse(req, res, 401, { otp: "Invalid OTP!" });

    const hashPassword = await bcrypt.hash(newPassword, 8);
    await adminService.updatePassword(user._id, hashPassword);
    // Optionally, you can add more password validation logic here.
    res.status(200).json({
      success: true,
      message: "Password reset successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// const verifyOtpResetPass = async (req, res) => {};
module.exports = {
  register,
  login,
  verifyOtp,
  forgetPassword,
  resetPassword,
  changePassword,
  RefreshToken,
};
