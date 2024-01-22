const express = require("express");
const router = express.Router();
const { getDashboardCount } = require("../../../controllers/web/dashboard.controller");
// const authenticAdmin = require("../../helper/verifyAdminToken");
const {
    refreshToken,
    accessToken,
  } = require("../../../middlewares/AdminAuth");
  
router.get("/getDashboardCount", 
// authenticAdmin,
accessToken(),
 getDashboardCount);

module.exports = router;