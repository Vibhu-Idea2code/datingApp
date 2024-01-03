const Sexual = require("../../models/sexual.oriantetaion.model");
const { sexualService } = require("../../services");
const mongoose = require("mongoose");


const createSexual= async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody, "++++++sexual");
    const sexual= await sexualService.createSexual(reqBody);
    if (!sexual) {
      throw new Error("no such sexual");
    }
    res.status(200).json({
      message: "Successfully created a new sexual",
      success: true,
      data: { sexual},
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getSexualList = async (req, res) => {
  try {
    let sexual= await sexualService.getSexualList(req, res);
    res.status(200).json({
      message: "successfully fetched all sexual",
      status: true,
      data: sexual,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getSexualId = async (req, res) => {
  try {
   const  sexualEx=await sexualService.getSexualById(req.params.SexualId)
    console.log(req.params.SexualId);
    if (!sexualEx) {
      throw new Error("No Such Sexual Found!!!");
    }
    res.status(200).json({
      message: `Fetched the details of ${sexualEx._id}`,
      data: { sexualEx },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteSexual= async (req, res) => {
    try {
      const SexualId = req.params.SexualId;
      const sexualExists = await  sexualService.getSexualById(SexualId);
      if (!sexualExists) {
        throw new Error("Sexualnot found!");
      }
  
      await sexualService.deleteSexual(SexualId);
  
      res.status(200).json({
        success: true,
        message: "Sexual delete successfully!",
        data: sexualExists,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

const updateSexual= async (req, res) => {
  try {
    const SexualId = req.params.SexualId;
    const sexualEx = await sexualService.getSexualById(SexualId);
    if (!sexualEx) {
      throw new Error("SexualId does not exist");
    }
    await sexualService.updateSexual(SexualId, req.body);
    res.status(201).json({
      success: true,
      message: "successfully updated",
      data: { sexualEx },
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
    const result = await Sexual.deleteMany({ _id: { $in: id } });
    if (result.deletedCount === 0) {
      throw new Error("Not Find sexual Orientation ");
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


/* ------------------------------ UPDATE STATUS ----------------------------- */
const updateSexualOrientationStatus = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const sexualOrien = await Sexual.findById(id);

    if (!sexualOrien) {
      throw new Error("User not found!");
    }

    sexualOrien.status = !sexualOrien.status;
    const result = await sexualOrien.save();

    res.status(200).json({
      success: true,
      message: "Sexual Orientation Status Update successfully!!",
      data: result,
    
    });
  } catch (err) {
    next(err);
  }
};

// Delete a multiple banner  or sub banner  with there Id's
const deleteMultiSexualOrientation = async (req, res, next) => {
try {
  const { Ids } = req.body;
  Ids.map(async (item) => {
    const id = new mongoose.Types.ObjectId(item);
    const sexualOrien = await Sexual.findById(id);
    // deleteFiles(sexualOrien.user_img);
    await Sexual.deleteOne({ _id: id });
  });
   
  res.status(200).json({
    success: true,
    message: "All selected sexual deleted successfully.!",
    // data: result,
  
  });
} catch (error) {
  next(error);
}
};
module.exports = { createSexual, getSexualList, getSexualId, deleteSexual,updateSexual,multipleDelete,updateSexualOrientationStatus,deleteMultiSexualOrientation};