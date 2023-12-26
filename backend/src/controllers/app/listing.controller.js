const { listingService } = require("../../services");

/* -------------------------- PET LIST BY USER SIDE ------------------------- */
const petList = async (req, res) => {
  try {
    const getPet = await listingService.getPetsList();

    res.status(200).json({
      success: true,
      message: "pet List!",
      data: {
        getPet,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------- INTEREST LIST BY USER SIDE ------------------------- */
const interestList = async (req, res) => {
  try {
    const getHob = await listingService.getHobbiesList();

    res.status(200).json({
      success: true,
      message: "interest List!",
      data: {
        getHob,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------- SIGN LIST BY USER SIDE ------------------------- */
const signList = async (req, res) => {
  try {
    const getSign = await listingService.getSignList();

    res.status(200).json({
      success: true,
      message: "sign List!",
      data: {
        getSign,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------- SEXUAL ORIENTATION LIST BY USER SIDE ------------------------- */
const sexualList = async (req, res) => {
  try {
    const getSexual = await listingService.getSexualList();

    res.status(200).json({
      success: true,
      message: "Sexual Orientation List!",
      data: {
        getSexual,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sexualList,
  signList,
  interestList,
  petList,
};
