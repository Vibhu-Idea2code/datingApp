const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
title:{
    type:String,
},
description:{
    type: String,
},
})

const Notification = mongoose.model("notification", notificationSchema);
module.exports = Notification;