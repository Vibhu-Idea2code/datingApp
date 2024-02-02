const { Notification } = require("../../models");
const { notificationService } = require("../../services");
const mongoose = require("mongoose");
/* --------------------------- NOTIFICATION CREATE -------------------------- */

const createNotification = async (req, res) => {
  try {
    const reqBody = req.body;
    const notification = await notificationService.createNotification(reqBody);
    if (!notification) {
      throw new Error("Something went wrong, please try again or later!");
    }
    res.status(200).json({
      success: true,
      message: "Notification create successfully!",
      data: notification,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* --------------------------- LIST NOTIFICATION -------------------------- */

const getNotificationList = async (req, res) => {
  try {
    let notification = await notificationService.getNotificationList(req, res);
    res.status(200).json({
      message: "successfully fetched all notification",
      status: true,
      data: notification,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------- LIST NOTIFICATION BY ID ------------------------ */
const getNotificationId = async (req, res) => {
  try {
    const notification = await notificationService.getNotificationById(
      req.params.notificationId
    );
    console.log(req.params.notificationId);
    if (!notification) {
      throw new Error("No Such Notification Found!!!");
    }
    res.status(200).json({
      message: `Fetched the details of ${notification._id}`,
      data: notification,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------ DELETE NOTIFICATION BY ID ----------------------- */
const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const notification = await notificationService.getNotificationById(
      notificationId
    );
    if (!notification) {
      throw new Error("notification not found!");
    }

    await notificationService.deleteNotification(notificationId);

    res.status(200).json({
      success: true,
      message: "notification delete successfully!",
      data: notification,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------ UPDATE NOTIFICATION BY ID ----------------------- */
const updateNotification = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const notification = await notificationService.getNotificationById(
      notificationId
    );
    if (!notification) {
      throw new Error("notification Id does not exist");
    }
    await notificationService.updateNotification(notificationId, req.body);
    res.status(201).json({
      success: true,
      message: "successfully updated",
      data: notification,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------- MULTIPLE DELETE BY ID ------------------------- */
const multipleDelete = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Notification.deleteMany({ _id: { $in: id } });
    if (result.deletedCount === 0) {
      throw new Error("No users deleted");
    }
    return res.status(200).send({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      message: `${err}`,
    });
  }
};
/* ----------------------- UPDATE NOTIFICATION STATUS ----------------------- */
const updateNotificationStatus = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const notification = await Notification.findById(id);

    if (!notification) {
      throw new Error("notifications not found!");
    }

    notification.status = !notification.status;
    const result = await notification.save();

    res.status(200).json({
      success: true,
      message: "notification Status Update successfully!!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNotification,
  getNotificationList,
  getNotificationId,
  deleteNotification,
  updateNotification,
  multipleDelete,
  updateNotificationStatus,
  // getUserDetails,
  // updateDetails,
  // deleteUser,
  // sendMail,
};
