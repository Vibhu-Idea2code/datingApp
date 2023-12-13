const mongoose = require("mongoose");

const subSchema = new mongoose.Schema(
  {
    plan: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'plan',
        },
      ],
      user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      status:{
        type : String ,
        default:'0',
        // enum: ['pending','approved'],
      },
    is_active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
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