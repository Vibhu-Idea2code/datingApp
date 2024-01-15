
const {  Notification } = require("../models");

/**create Notification */
const createNotification = async (reqBody) => {
  return Notification.create(reqBody);
};
/**get Notification list */
const getNotificationList = async (filter, options) => {
 return Notification.find();
};

// /**get Sexual details by id */
const getNotificationById = async (notificationId) => {
  return Notification.findById(notificationId);
};

// /**update Sexual and token */
const updateNotification = async (notificationId, updateBody) => {
  return Notification.findByIdAndUpdate(notificationId, { $set: updateBody });
};

// /**delete Sexual */
const deleteNotification = async (notificationId) => {
  return Notification.findByIdAndDelete(notificationId);
};

module.exports = {
    createNotification,
  getNotificationList,
  getNotificationById,
  updateNotification,
  deleteNotification,
};