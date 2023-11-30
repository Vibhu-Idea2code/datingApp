const mongoose = require("mongoose");

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
        if (data?.profile) {
          data.profile = `${config.base_url}profile_images/${data.profile}`;
        }
      },
    },
  }
);

module.exports = mongoose.model("user", userSchema);
