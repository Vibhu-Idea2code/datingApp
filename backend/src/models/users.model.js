const mongoose = require("mongoose");
const config = require("../config/config");
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    birthDate: {
      type: Date,
    },
    gender: {
      type: String,
    },
    sexual: {
      type: Array,
    },
    showMe: {
      type: String,
    },
    school: {
      type: String,
    },
    interest: {
      type: Array,
      // type: mongoose.Types.ObjectId,
      // ref:"hobbies",
    },
    sign: {
      type: Array,
    },
    pets: {
      type: Array,
    },
    address: {
      type: String,
    },
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
    maxAge: {
      type: Number,
    },
    minAge: {
      type: Number,
    },
    maxDistance: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    company:{
      type:String,
    },
    jobTitle: {
      type: String,
    },
    age: {
      type: Number,
    },
    token: {
      type: String,
    },
    city:{
      type:String
    },
    aboutMe:{
      type :String,
    }, 
    likeduser:{
      type:Array,
    },
    user_img:{
      type:String
    },
    role: {
      type: String,
      default:"user",
      enum: ["admin", "user", "subadmin"], // 1-admin  2 -user   3-superadmin
    },
  },

  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, data) {
        if (data?.user_img) {
          data.user_img = `${config.base_url}profile_images/${data.user_img}`;
        }
      },
    },
  }
);

const User= mongoose.model("user", userSchema);
module.exports=User;
