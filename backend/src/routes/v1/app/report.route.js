const express=require('express');
const {reportController}=require('../../../controllers');
const router=express.Router();

router.post('/create-report',
reportController.createReport);

router.get('/list',
reportController.getReportList);


module.exports=router;