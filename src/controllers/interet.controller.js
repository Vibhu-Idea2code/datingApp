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

/** Get Interest details */
const getDetails = async (req, res) => {
  try {
    const InterestExists = await interestService.getInterestById(
      req.params.InterestId
    );
    if (!InterestExists) {
      throw new Error("Interest not found!");
    }

    res.status(200).json({
      success: true,
      message: "Interest details get successfully!",
      data: InterestExists,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get details using aggrgation */
const getDetailsByAggegation = async (req, res) => {
  try {
    const InterestDetails = await interestService.getInterestDetails(
      req.params.InterestId
    );
    if (!InterestDetails.length) {
      throw new Error("Interest not found!");
    }

    res.status(200).json({
      success: true,
      message: "Interest details get successfully!",
      data: InterestDetails[0],
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get prooduct list */
const getInterestList = async (req, res) => {
  try {
    const { search, ...options } = req.query;
    let filter = {};

    if (search) {
      filter.Interest_name = { $regex: search, $options: "i" };
    }

    const getList = await interestService.getInterestList(filter, options);

    res.status(200).json({
      success: true,
      data: getList,
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
    const InterestId = req.params.InterestId;
    const InterestExists = await interestService.getInterestById(InterestId);
    if (!InterestExists) {
      throw new Error("Interest not found!");
    }

    if (req.file) {
      reqBody.Interest_image = req.file.filename;
    }

    const updatedInterest = await interestService.updateInterest(
      InterestId,
      reqBody
    );
    if (updatedInterest) {
      if (req.file) {
        const filePath = `./public/Interest_images/${InterestExists.Interest_image}`;
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
  getDetails,
  getDetailsByAggegation,
  getInterestList,
  updateInterest,
  manageInterestStatus,
  deleteInterest,
};