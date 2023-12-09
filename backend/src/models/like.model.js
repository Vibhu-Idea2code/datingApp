const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    
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
},
  {
    timestamps: true,
    versionKey: false,
  },
);

// Declaring model for plan
const Like = mongoose.model("like", likeSchema);
module.exports = Like;