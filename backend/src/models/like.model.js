const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    status:{
      type :Boolean,
      default: true,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    likeduser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },likeStatus: { type: Boolean, default: true }
},
  {
    timestamps: true,
    versionKey: false,
  },
);

// Declaring model for plan
const Like = mongoose.model("like", likeSchema);
module.exports = Like;