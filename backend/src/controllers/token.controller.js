const { tokenService } = require("../services");
const moment = require("moment");

/** Create access and refresh tokens in jsonwebtoken and save in our database. */
const generateTokens = async (req, res) => {
  try {
    const reqBody = req.body;

    reqBody.expire_time_access = moment().add(10, "minutes");
    reqBody.expire_time_refresh = moment().add(1, "day");

    /** Create access token in jsonwebtoken */
    const accessToken = await tokenService.generateToken(reqBody, "access");

    /** Create refresh token in jsonwebtoken */
    const refreshToken = await tokenService.generateToken(reqBody, "refresh");

    reqBody.token_access = accessToken;
    reqBody.token_refresh = refreshToken;

    /** Save tokens in our database */
    const saveTokens = await tokenService.saveToken(reqBody);

    res.status(200).json({
      success: true,
      message: "Tokens created!",
      data: saveTokens,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong!",
    });
  }
};

/** Verify access token */
const verifyAccessToken = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Access token successfully verified!",
    data: req.user,
  });
};

/** Verify refresh token */
const verifyRefreshToken = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Refresh token successfully verified!",
    data: req.user,
  });
};

module.exports = {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
};
