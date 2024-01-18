const { Report } = require("../models");

/**create Like */
const createReport = async (reqBody) => {
  return Report.create(reqBody);
};
/**get Report list */
const getReportList = async (filter, options) => {
 return Report.find().populate({
    path: "user",
    select: ["_id", "first_name"],
  }).populate({
    path: "reportBy",
    select: ["_id", "first_name"],
  });
};



  
module.exports = {
  createReport,
  getReportList,
};