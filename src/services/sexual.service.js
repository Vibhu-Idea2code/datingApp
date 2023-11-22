
const { Sexual } = require("../models");

/**create Sexual */
const createSexual = async (reqBody) => {
  return Sexual.create(reqBody);
};
/**get Sexual list */
const getSexualList = async (filter, options) => {
 return Sexual.find();
};

/**get Sexual details by id */
const getSexualById = async (SexualId) => {
  return Sexual.findById(SexualId);
};

/**update Sexual and token */
const updateSexual = async (sexualId, updateBody) => {
  return Sexual.findByIdAndUpdate(sexualId, { $set: updateBody });
};

/**delete Sexual */
const deleteSexual = async (sexualId) => {
  return Sexual.findByIdAndDelete(sexualId);
};

module.exports = {
  createSexual,
  getSexualList,
  getSexualById,
  updateSexual,
  deleteSexual,
};