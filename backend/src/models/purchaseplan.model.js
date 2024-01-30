// src/models/User.js
const mongoose = require("mongoose");
const config = require("../config/config");

const purchasePlanSchema = new mongoose.Schema(
  {
    user:{type : mongoose.Schema.Types.ObjectId , ref : 'user'},
    plan:[{
      type : mongoose.Schema.Types.ObjectId , ref : 'plan'
    }],
    boost: { type: Number },
   
    is_active: {
      type: Boolean,
      default: true,
    },
    
  status:{type: Boolean,default: true},

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PurchasePlan = mongoose.model("purchaseplan", purchasePlanSchema);

module.exports = PurchasePlan;
