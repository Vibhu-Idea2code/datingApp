const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
   
    user: 
    [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
      reportBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
      status:{
        type : Boolean ,
        default:false
      },
      reason:{
        type : String , 
      },
},
  {
    timestamps: true,
    versionKey: false,
  },
);

// Declaring model for plan
const Report = mongoose.model("report", reportSchema);
module.exports = Report;