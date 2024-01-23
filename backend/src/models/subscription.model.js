const mongoose = require("mongoose");
// const moment = require('moment');
const moment = require('moment-timezone');

const subSchema = new mongoose.Schema(
  {
    planid: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'plan',
        },
      ],
      userid: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      nationality:{
        type : mongoose.Types.ObjectId , ref : 'countrycode'
      },
      status:{
        type : String ,
        default:true,
        // enum: ['pending','approved'],
      }, 
    is_active: {
      type: Boolean,
      default: true,
    },
    StartDate: {
      type: Date,
      default: new Date(), // This will use the current date and time in the system's time zone
    },
    
    endDate:{
      type: Date
    },
   cancelled:{
    type:String,
    default:"N/A"
   },
  },
  // {
  //   timestamps: true,
  //   versionKey: false,
  // }
);

// subscribe table

// user id 
// plan id
// plan name
// status
// timestamp
// plan name
// description
// price per month
// 1:active
// 2:deactive

// Declaring model for purchasenplan
const Subscription = mongoose.model("subscription", subSchema);
module.exports = Subscription;