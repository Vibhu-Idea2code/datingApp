
const { CountryCode } = require("../models");

/**create CountryCode */
const createCountryCode = async (reqBody) => {
  return CountryCode.create(reqBody);
};
/**get CountryCode list */
const getCountryCodeList = async (filter, options) => {
 return CountryCode.find();
};

/**get CountryCode details by id */
const getCountryCodeById = async (CountrycodeId) => {
  return CountryCode.findById(CountrycodeId);
};
/**update CountryCode and token */
const updateCountryCode = async (CountrycodeId, updateBody) => {
  return CountryCode.findByIdAndUpdate(CountrycodeId, { $set: updateBody });
};
 
/**delete CountryCode */
const deleteCountryCode = async (CountrycodeId) => {
  return CountryCode.findByIdAndDelete(CountrycodeId);
};

/**get CountryCode list */
// const getCountryCodeList = async (req, res) => {
//   return CountryCode.find();
// };

module.exports = {
  createCountryCode,
  getCountryCodeList,
  getCountryCodeById,
  updateCountryCode,
  deleteCountryCode,
};

