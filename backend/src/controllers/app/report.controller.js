const { Report } = require("../../models");
const { reportService } = require("../../services");


const createReport = async (req, res) => {
    try {
      const reqBody = req.body;
      console.log(reqBody, "++++++report");
      const report = await reportService.createReport(reqBody);
      if (!report) {
        throw new Error("no such report");
      }
      res.status(200).json({
        message: "Successfully created a new report",
        success: true,
        data:  report ,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  
  

  const getReportList = async (req, res) => {
    try {
      let report = await reportService.getReportList(req, res);
      res.status(200).json({
        message: "successfully fetched all report",
        status: true,
        report: report ,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  
module.exports = { createReport,getReportList}
