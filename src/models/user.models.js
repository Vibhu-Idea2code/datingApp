const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    // user name
    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    birth_date: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    // gender: {
    //   type: String,
    //   enum: ["male", "female", "other"],
    //   default: "male",
    // },
    // sexual_orientation: {
    //   type: String,
    //   enum: ["straight", "gay", "lesbian", "bisexual", "pansexual", "asexual"],
    //   default: "straight",
    // },
    phone_number: {
      type: Number,
      unique: true,
      minlength: 10,
      maxlength: 15,
    },
    otp: { type: String, required: true },
    otpExpiry: { type: Date, required: true },
    // looking_for: {
    //   type: String,
    //   enum: ["men", "women", "both"],
    //   default: "men",
    // },
    // location: {
    //   type: String,
    //   default: "",
    // },
    // about: {
    //   type: String,
    //   default: "",
    // },
    // profile_pic: {
    //   type: String,
    //   default: "default-profile.jpg",
    // },
    // hobbies: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Hobbies",
    // },
    // pets: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Pets",
    // },
    // education: {
    //   type: String,
    //   trim: true,
    // },
    // zodiac_sign: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Sign",
    //   required: false,
    // },
    // job_title: {
    //   type: String,
    //   trim: true,
    //   required: false,
    // },
    // company: {
    //   type: String,
    //   trim: true,
    //   required: false,
    // },
    // living: {
    //   type: String,
    //   trim: true,
    // },
    // school: {
    //   type: String,
    //   trim: true,
    // },
    // // user email
    // email: {
    //   type: String,
    //   trim: true,
    // },
    // // password of the user
    // password: {
    //   type: String,
    //   trim: true,
    // },
    // // address of the user
    // address: {
    //   type: String,
    //   trim: true,
    // },
    // country india of the user
    country_india: {
      type: String,
      default: "india",
    },
    // role of the user
    role: {
      type: String,
      default: "user", // 1-admin  2 -user   3-superadmin
    },
    is_active:{
      type:Boolean,
      default:false
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified || !this.isNew) {
    next();
  } else this.isModified("password");
  if (this.password)
    this.password = await bcrypt.hash(String(this.password), 12);
  next();
});
const User = mongoose.model("user", userSchema);
module.exports = User;
