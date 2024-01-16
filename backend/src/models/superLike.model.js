const mongoose = require("mongoose");

const SuperLikeSchema = new mongoose.Schema(
  {
    LikeType:{
      type:String,
    },
    fromuserid: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
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
const SuperLike = mongoose.model("superlike", SuperLikeSchema);
module.exports = SuperLike;