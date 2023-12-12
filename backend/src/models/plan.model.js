const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    month: {
      type: String,
      // trim: true,
    },
    amount_per_month: {
      type: String,
    },
    status:{
      type :Boolean,
      default: true,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Declaring model for plan
const Plan = mongoose.model("plan", planSchema);
module.exports = Plan;