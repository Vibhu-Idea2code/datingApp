const { Boost } = require("../../models");
const { boostService } = require("../../services");
const mongoose = require("mongoose");
const cron = require('node-cron');

// const createBoost = async (req, res) => {
//   try {
//     const reqBody = req.body;
//     console.log(reqBody, "++++++Boost");
//     const boost = await boostService.createBoost(reqBody);
//     if (!boost) {
//       throw new Error("no such Boost");
//     }
//     res.status(200).json({
//       message: "Successfully created a new Boost",
//       success: true,
//       data:  boost ,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// const boostService = require('./boostService'); // Import your boost service module
// User
const createBoost = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody, "++++++Boost");

    // Assuming boostService.createBoost returns the created boost and user information
    const { boost, user } = await boostService.createBoost(reqBody);

    if (!boost) {
      throw new Error("No such Boost");
    }

    // Check if the user is eligible for boosting (e.g., not boosted within the last 30 minutes)
    const isEligibleForBoost = await boostService.isEligibleForBoost(user._id);

    if (!isEligibleForBoost) {
      throw new Error("User is not eligible for another boost at the moment");
    }

    const boostStartTime = new Date(boost.startTime);
    const boostEndTime = new Date(boostStartTime.getTime() + 30 * 60 * 1000); // 30 minutes in milliseconds
    
    console.log(boostStartTime, "startTime");
    console.log(boostEndTime, "endTime");
    
    // Update the boost object with the calculated end time
    boost.endTime = boostEndTime;
  
    // Assuming there's a method like updateUserStatus in your boostService
    await boostService.updateUserStatus(user._id, true);

    // Increment the boost count for the user
    await boostService.incrementUserBoostCount(user._id);

    res.status(200).json({
      message: "Successfully created a new Boost",
      success: true,
      data:  boost , // Update the endTime in the response
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};









const getBoostList = async (req, res) => {
  try {
    let Boost = await boostService.getBoostList(req, res);
    res.status(200).json({
      message: "successfully fetched all Boost",
      status: true,
      data: Boost,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getBoostId = async (req, res) => {
  try {
    const BoostEx = await boostService.getBoostById(req.params.BoostId);
    console.log(req.params.BoostId);
    if (!BoostEx) {
      throw new Error("No Such Boost Found!!!");
    }
    res.status(200).json({
      message: `Fetched the details of ${BoostEx._id}`,
      data: { BoostEx },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteBoost = async (req, res) => {
  try {
    const BoostId = req.params.BoostId;
    const petExists = await boostService.getBoostById(BoostId);
    if (!petExists) {
      throw new Error("Boost not found!");
    }

    await boostService.deleteBoost(BoostId);

    res.status(200).json({
      success: true,
      message: "Boost delete successfully!",
      data: petExists,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateBoost = async (req, res) => {
  try {
    const BoostId = req.params.BoostId;
    const BoostEx = await boostService.getBoostById(BoostId);
    if (!BoostEx) {
      throw new Error("BoostId does not exist");
    }
    await boostService.updateBoost(BoostId, req.body);
    res.status(201).json({
      success: true,
      message: "successfully updated",
      data: { BoostEx },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const multipleDelete = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Boost.deleteMany({ _id: { $in: id } });
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

const updateBoosttatus = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const pet = await Boost.findById(id);

    if (!pet) {
      throw new Error("Boost not found!");
    }

    pet.status = !pet.status;
    const result = await pet.save();

    res.status(200).json({
      success: true,
      message: "pet Status Update successfully!!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// const undoBoost=async(req, res, next) => {

// }
module.exports = {
  createBoost,
  getBoostList,
  getBoostId,
  deleteBoost,
  updateBoost,
  multipleDelete,
  updateBoosttatus,
};
