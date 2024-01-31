// src/models/User.js
const mongoose = require("mongoose");
const config = require("../config/config");

const purchasePlanSchema = new mongoose.Schema(
  {
    user:{type:mongoose.Schema.Types.ObjectId , ref : 'user'},
    plan:{
      type : mongoose.Schema.Types.ObjectId , ref : 'plan'
    },
    boost: { type: Number },
    totalBoost:{type:Number},
    like: { type: Number },
    superLike: { type: Number },

    startDate:{
      type: Date,
      default: () => new Date()
    },
    endDate:{
      type: Date,
    },
     payment:{
      type:String,
     },   
     paymentStatus:{
      type: String,
     },
    is_active: {
      type: Boolean,
      default: false,
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
