const { Pets } = require("../../models");
const { petsService } = require("../../services");
const mongoose = require("mongoose");


const createPets = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody, "++++++Pets");
    const pets = await petsService.createPets(reqBody);
    if (!pets) {
      throw new Error("no such Pets");
    }
    res.status(200).json({
      message: "Successfully created a new Pets",
      success: true,
      data: { pets },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getPetsList = async (req, res) => {
  try {
    let pets = await petsService.getPetsList(req, res);
    res.status(200).json({
      message: "successfully fetched all Pets",
      status: true,
      data: pets ,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getPetsId = async (req, res) => {
  try {
   const  petsEx=await petsService.getPetsById(req.params.petsId)
    console.log(req.params.petsId);
    if (!petsEx) {
      throw new Error("No Such Pets Found!!!");
    }
    res.status(200).json({
      message: `Fetched the details of ${petsEx._id}`,
      data: { petsEx },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deletePets = async (req, res) => {
    try {
      const petsId = req.params.petsId;
      const petExists = await  petsService.getPetsById(petsId);
      if (!petExists) {
        throw new Error("pets not found!");
      }
  
      await petsService.deletePets(petsId);
  
      res.status(200).json({
        success: true,
        message: "pets delete successfully!",
        data: petExists,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

const updatePets = async (req, res) => {
  try {
    const petsId = req.params.petsId;
    const PetsEx = await petsService.getPetsById(petsId);
    if (!PetsEx) {
      throw new Error("PetsId does not exist");
    }
    await petsService.updatePets(petsId, req.body);
    res.status(201).json({
      success: true,
      message: "successfully updated",
      data: { PetsEx },
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
    const result = await Pets.deleteMany({ _id: { $in: id } });
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

const updatePetStatus= async (req, res) => {
 
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const pet = await Pets.findById(id);

    if (!pet) {
      throw new Error("Pets not found!");
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

// const undoPets=async(req, res, next) => {
  
// }
module.exports = { createPets, getPetsList, getPetsId, deletePets,updatePets,multipleDelete,updatePetStatus };