const { listingService, planService } = require("../../services");

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

const getPlanList = async (req, res) => {
  try {
    let plans = await planService.getPlanList(req, res);
    // Extracting required fields from each plan object
    let formattedPlans = plans.map(plan => ({
      planType: plan.planType,
      planName: plan.planName,
      description: plan.description,
      price:plan.price
    }));
    res.status(200).json({
      message: "Successfully fetched all plans",
      status: true,
      data: formattedPlans,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



module.exports = {
  sexualList,
  signList,
  interestList,
  petList,
  getPlanList
};
