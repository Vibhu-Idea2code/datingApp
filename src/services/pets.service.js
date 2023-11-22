
const { Pets } = require("../models");

/**create Pets */
const createPets = async (reqBody) => {
  return Pets.create(reqBody);
};
/**get Pets list */
const getPetsList = async (filter, options) => {
 return Pets.find();
};

/**get Pets details by id */
const getPetsById = async (petsId) => {
  return Pets.findById(petsId);
};

/**update Pets and token */
const updatePets = async (petsId, updateBody) => {
  return Pets.findByIdAndUpdate(petsId, { $set: updateBody });
};

/**delete Pets */
const deletePets = async (petsId) => {
  return Pets.findByIdAndDelete(petsId);
};

module.exports = {
  createPets,
  getPetsList,
  getPetsById,
  updatePets,
  deletePets,
};