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

    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "like" }],
    boost: { type: Number, default: 0 },
    superlike: { type: Number, default: 0 },
    sexual: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sexual",
      },
    ],
    // subscription:[
    //   {type : mongoose.Schema.Types.ObjectId , ref : 'subscription'}
    // ],

    showMe: {
      type: String,
    },
    school: {
      type: String,
    },
    countryCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "countrycode",
    },
    subscription: {
      type: Boolean,
      default: false,
    },

    interest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hobbies",
      },
    ],
    plan: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plan",
      },
    ],
    freeboost: {
      type: Number,
      default: 0,
    },
    totalboost: {
      type: Number,
    },
    startDatePlan: {
      type: Date,
    },
    endDatePlan: {
      type: Date,
    },
    sign: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sign",
      },
    ],

    pets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pet",
      },
    ],
    // likeduser: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'like',
    //   },
    // ],
    location: {
      type: String,
    },
    ageControl: {
      type: String,
    },
    distanceControl: {
      type: Number,
    },
    image: {
      type: String,
    },
    boostStatus: {
      type: Boolean,
      default: false,
    },
    superlikeStatus: {
      type: Boolean,
      default: false,
    },
    boostExpiryTime: {
      type: Date,
      // default:'22/01/2010'
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
      default: false,
    },
    company: {
      type: String,
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
    city: {
      type: String,
    },
    online: {
      type: Boolean,
    },

    aboutMe: {
      type: String,
    },
    boostCount: {
      type: Number,
      default: 0,
    },

    user_img: {
      // GALLERY IMAGES(MULTIPLE)
      type: [String],
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user", "subadmin"], // 1-admin  2 -user   3-superadmin
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
  //   toJSON: {
  //     transform: function (doc, data) {
  //       if (Array.isArray(data.user_img)) {
  //         data.user_img = data.user_img.map(
  //           (user_img) => `${config.base_url}profile_images/${user_img}`
  //         );
  //       }
  //     },
  //   },
);

const User = mongoose.model("user", userSchema);
module.exports = User;
