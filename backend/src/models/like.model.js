const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
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
      planStatus:{
        type : Boolean ,
        default:false
      },
      purchaseplan: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'purchaseplan',
      },
      action:{
        type : String , 
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
const Like = mongoose.model("like", likeSchema);
module.exports = Like;