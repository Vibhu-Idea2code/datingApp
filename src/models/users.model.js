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

    phoneNumber: { type: String, required: true },
    otp: { type: String,default:""},
    otpExpiry: { type: Date},
    birthDate:{
      type: Date,
    },
    gender: {
      type: Array,
    },
    sexual:{
      type: String,
    },
    showMe:{
      type: String,
    },
    school:{
      type: String,
    },
    interest:{
      type: String,
    },
    sign:{
      type: String,
    },
    pets:{
      type: String,
    },
    address:{

    },
    status: {
      type: Boolean,
      default: true,
    },
    token:{
      type:String,
        }
    // profile:{
    //     type: String,
    // }
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