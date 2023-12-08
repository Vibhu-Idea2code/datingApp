const express = require("express");
const validate = require("../../middlewares/validate");

const { tokenController } = require("../../controllers");
const auth = require("../../middlewares/auth");

const router = express.Router();

/** Create jsonwebtoken */
router.post(
  "/create-token",
 tokenController.generateTokens
 );

/** Verify token to get user details */
router.get("/verify-token", auth(), tokenController.verifyRefreshToken);

module.exports = router;