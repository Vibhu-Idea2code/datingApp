
const { Hobbies } = require("../models");

/**create Hobbies */
const createHobbies = async (reqBody) => {
  return Hobbies.create(reqBody);
};
/**get Hobbies list */
const getHobbiesList = async (filter, options) => {
 return Hobbies.find();
};

/**get Hobbies details by id */
const getHobbiesById = async (hobbiesId) => {
  return Hobbies.findById(hobbiesId);
};
/**update Hobbies and token */
const updateHobbies = async (hobbiesId, updateBody) => {
  return Hobbies.findByIdAndUpdate(hobbiesId, { $set: updateBody });
};

/**delete Hobbies */
const deleteHobbies = async (hobbiesId) => {
  return Hobbies.findByIdAndDelete(hobbiesId);
};

module.exports = {
  createHobbies,
  getHobbiesList,
  getHobbiesById,
  updateHobbies,
  deleteHobbies,
};
