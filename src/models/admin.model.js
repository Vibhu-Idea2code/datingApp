const mongoose = require("mongoose");

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
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// Declaring model for admin
const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;