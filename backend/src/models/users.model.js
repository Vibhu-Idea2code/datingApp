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
    boost:[
      {type : mongoose.Types.ObjectId , ref : 'boost'}
    ],
    sexual: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sexual",
      },
    ],

    showMe: {
      type: String,
    },
    school: {
      type: String,
    },
    // interest:{
    //   type: Array,
    // }

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
      default: true,
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
