const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../config/config");

const adminSchema = new mongoose.Schema(
  {
    admin_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      // trim: true,
    },
    phoneNumber: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["admin", "user", "subadmin"],
      // default: // 1-admin  2 -user   3-superadmin
    },
    admin_image:{
      type :String ,
    },
    otp:{
      type:Number,
    },
    token: {
      type: String,
    },
    refreshToken: { type: String },
    newPassword: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, data) {
        if (data?.admin_image) {
          data.admin_image = `${config.base_url}profile_images/${data.admin_image}`;
        }
      },
    },
  }
);
// adminSchema.pre("save", async function (next) {
//   if (!this.isModified || !this.isNew) {
//     next();
//   } else this.isModified("password");
//   // if (this.password)
//     // this.password = await bcrypt.hash(String(this.password), 12);
//   // next();
// });
// Declaring model for admin
const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;