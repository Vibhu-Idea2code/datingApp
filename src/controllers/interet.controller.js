const fs = require("fs");
const { interestService } = require("../services");

/** Create Interest */
const createInterest = async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.file) {
      reqBody.logo = req.file.filename;
    } else {
      throw new Error("logo image is required!");
    }

    const createdInterest = await interestService.createHobbies(reqBody);

    res.status(200).json({
      success: true,
      message: "Interest create successfully!",
      data: createdInterest,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};



/** Get details by id */
const getDetailsById = async (req, res) => {
  try {
    const interest = await interestService.getHobbiesById(
      req.params.hobbiesId
    );
    if (!interest) {
      throw new Error("Interest not found!");
    }

    res.status(200).json({
      success: true,
      message: "Interest details get successfully!",
      data: interest,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};


/** Update Interest details */
const updateInterest = async (req, res) => {
  try {
    const reqBody = req.body;
    const hobbiesId = req.params.hobbiesId;
    const InterestExists = await interestService.getHobbiesById(hobbiesId);
    if (!InterestExists) {
      throw new Error("Interest not found!");
    }

    if (req.file) {
      reqBody.logo = req.file.filename;
    }

    const updatedInterest = await interestService.updateHobbies(
      hobbiesId,
      reqBody
    );
    if (updatedInterest) {
      if (req.file) {
        const filePath = `../public/profile_images/${InterestExists.logo}`;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    } else {
      throw new Error("Something went wrong, please try again or later!");
    }

    res.status(200).json({
      success: true,
      message: "Interest details update successfully!",
      data: updatedInterest,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Manage Interest status */
const manageInterestStatus = async (req, res) => {
  try {
    const manageStatus = await interestService.manageInterestStatus(
      req.params.InterestId
    );

    let resMessage = manageStatus.is_active
      ? "Interest can enable to sale."
      : "Interest can not enable to sale";

    res.status(200).json({
      success: true,
      message: resMessage,
      data: manageStatus,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Delete Interest */
const deleteInterest = async (req, res) => {
  try {
    const InterestId = req.params.InterestId;
    const InterestExists = await interestService.getInterestById(InterestId);
    if (!InterestExists) {
      throw new Error("Interest not found!");
    }

    const deletedInterest = await interestService.deleteInterest(InterestId);
    if (deletedInterest) {
      const filePath = `./public/Interest_images/${InterestExists.Interest_image}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } else {
      throw new Error("Something went wrong, please try again or later!");
    }

    res.status(200).json({
      success: true,
      message: "Interest delete successfully!",
      data: deletedInterest,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

module.exports = {
  createInterest,
  // getDetails,
  getDetailsById,
  // getInterestList,
  updateInterest,
  manageInterestStatus,
  deleteInterest,
};