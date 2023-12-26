// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {numberController} = require('../../../controllers');

router.post('/send-otp', numberController.sendOtp);
router.post('/verify-otp', numberController.verifyOtp);

module.exports = router;
