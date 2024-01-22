const mongoose = require("mongoose");

const BoostSchema = new mongoose.Schema(
  {
    userId:{
      type: String,
    },
    status:{
      type:Boolean,
      default:true,
    },
    name:{
      type: String,
    },
    startTime:{
      type:Date,
      default: Date.now,
    },
    endTime:{
      type: Date,
    },
},
  {
    // timestamps: true,
    versionKey: false,
  },

  );
  // BoostSchema.pre('save', function (next) {
  //   // Convert Date to string format if needed
  //   this.startTime = this.startTime.toISOString();
  //   this.endTime = this.endTime.toISOString();
  //   next();
  // });

// Declaring model for plan
const Boost = mongoose.model("boost", BoostSchema);
module.exports = Boost;