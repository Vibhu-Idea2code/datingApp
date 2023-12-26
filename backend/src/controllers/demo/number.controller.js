// src/controllers/authController.js
const Number = require('../../models/number.model');
const otpGenerator = require('otp-generator');

exports.sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    // Generate a 6-digit OTP
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

    // Set OTP expiry to 5 minutes from now
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);

    // Save the user and OTP details in the database
    const user = new Number({ phoneNumber, otp, otpExpiry });
    await user.save();

    // Send OTP to the user (you can implement this part)

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    // Find the user by phone number and check OTP
    const user = await Number.findOne({ phoneNumber, otp, otpExpiry: { $gt: new Date() } });

    if (user) {
      // OTP is valid
      res.json({ message: 'OTP verified successfully' });
    } else {
      // Invalid OTP
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
