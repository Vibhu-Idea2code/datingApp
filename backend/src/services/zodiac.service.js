
const { Sign } = require("../models");

/**create Sign */
const createSign = async (reqBody) => {
  return Sign.create(reqBody);
};
/**get Sign list */
const getSignList = async (filter, options) => {
 return Sign.find();
};

/**get Sign details by id */
const getSignById = async (signId) => {
  return Sign.findById(signId);
};

/**update Sign and token */
const updateSign = async (signId, updateBody) => {
  return Sign.findByIdAndUpdate(signId, { $set: updateBody });
};

/**delete Sign */
const deleteSign = async (signId) => {
  return Sign.findByIdAndDelete(signId);
};

module.exports = {
  createSign,
  getSignList,
  getSignById,
  updateSign,
  deleteSign,
};