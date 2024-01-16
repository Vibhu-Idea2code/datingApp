const mongoose = require("mongoose");

const BoostSchema = new mongoose.Schema(
  {
    LikeType:{
      type:String,
    },
    plan: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan',
      },
      touserid: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      read:
      {
        type : Boolean ,
        default:false
      }
},
  {
    timestamps: true,
    versionKey: false,
  },
);

// Declaring model for plan
const Boost = mongoose.model("boost", BoostSchema);
module.exports = Boost;