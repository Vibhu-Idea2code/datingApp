const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    planType:{
      type:String,
    },
    planName: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      // trim: true,
    },
    price:{
      type:Number,
    },
    duration: {
      type: String, //in day (unlimited and 180 days)
      // trim: true,
      default:"Unlimited" 
    },
    freeBoost:{
     type:Number,
    },
    boostDuration:{
      type:String  // two option (weekly and monthly)
    },
    freeSuperLike:{
 type:String
    },
    SuperLikeduration:{
      type:String  // two option (weekly and monthly)
    },
    limit:{
      type : String ,   // the number of superlikes a user can do in a given
    default:"N/A"
    },
    feature: {
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
    purchasedByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // Assuming 'user' is the name of your user model
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