
const { Plan } = require("../models");

/**create Plan */
const createPlan = async (reqBody) => {
  return Plan.create(reqBody);
};
/**get Plan list */
const getPlanList = async (filter, options) => {
 return Plan.find();
};

/**get Plan details by id */
const getPlanById = async (planId) => {
  return Plan.findById(planId);
};

/**update Plan and token */
const updatePlan = async (planId, updateBody) => {
  return Plan.findByIdAndUpdate(planId, { $set: updateBody });
};

/**delete Plan */
const deletePlan = async (planId) => {
  return Plan.findByIdAndDelete(planId);
};

module.exports = {
  createPlan,
  getPlanList,
  getPlanById,
  updatePlan,
  deletePlan,
};