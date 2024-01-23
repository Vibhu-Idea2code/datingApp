// src/models/User.js
const mongoose = require("mongoose");
const config = require("../config/config");

const countrySchema = new mongoose.Schema(
  {
    countryCode: { type: String, required: true },
    countryflag: { type: String },

    is_active: {
      type: Boolean,
      default: true,
    },
    
  status:{type: Boolean,default: true},

  },
  {
    timestamps: true,
    versionKey: false,
    // toJSON: {
    //   transform: function (doc, data) {
    //     if (data?.logo) {
    //       data.logo = `${config.base_url}profile_images/${data.logo}`;
    //     }
    //   },
    // },
  }
);

const CountryCode = mongoose.model("countrycode", countrySchema);

module.exports = CountryCode;
