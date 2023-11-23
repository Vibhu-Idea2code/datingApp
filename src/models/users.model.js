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
    Otp: { type: String},
    otpExpiry: { type: Date},
    birthDate:{
      type: Date,
    },
    gender: {
      type: Array,
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