const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
title:{
    type:String,
},
description:{
    type: String,
},
read: { type: Boolean, default: false },

user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
})

const Notification = mongoose.model("notification", notificationSchema);
module.exports = Notification;     