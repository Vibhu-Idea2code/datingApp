const fs = require("fs");
const { interestService } = require("../../services");
const { Hobbies } = require("../../models");
const mongoose = require("mongoose");


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
    const interest = await interestService.getHobbiesById(req.params.hobbiesId);
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

/* ---------------------------- INTEREST ALL LIST --------------------------- */
const interestList = async (req, res) => {
  try {
    const getHob = await interestService.getHobbiesList();
    const baseUrl =
      req.protocol +
      "://" +
      req.get("host") +
      process.env.BASE_URL_PROFILE_PATH;
    res.status(200).json({
      success: true,
      message: "interest List!",
      data: {
        getHob,
      },
      baseUrl: baseUrl,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/** Manage Interest status */
// const manageInterestStatus = async (req, res) => {
//   try {
//     const manageStatus = await interestService.manageInterestStatus(
//       req.params.InterestId
//     );

//     let resMessage = manageStatus.is_active
//       ? "Interest can enable to sale."
//       : "Interest can not enable to sale";

//     res.status(200).json({
//       success: true,
//       message: resMessage,
//       data: manageStatus,
//     });
//   } catch (error) {
//     res.status(error?.statusCode || 400).json({
//       success: false,
//       message:
//         error?.message || "Something went wrong, please try again or later!",
//     });
//   }
// };

// /** Delete Interest */
// const deleteInterests = async (req, res) => {
//   try {
//     const InterestId = req.params.InterestId;
//     const InterestExists = await interestService.getInterestById(InterestId);
//     if (!InterestExists) {
//       throw new Error("Interest not found!");
//     }

//     const deletedInterest = await interestService.deleteInterest(InterestId);
//     if (deletedInterest) {
//       const filePath = `./public/Interest_images/${InterestExists.Interest_image}`;
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//       }
//     } else {
//       throw new Error("Something went wrong, please try again or later!");
//     }

//     res.status(200).json({
//       success: true,
//       message: "Interest delete successfully!",
//       data: deletedInterest,
//     });
//   } catch (error) {
//     res.status(error?.statusCode || 400).json({
//       success: false,
//       message:
//         error?.message || "Something went wrong, please try again or later!",
//     });
//   }
// };
const deleteInterest = async (req, res) => {
  try {
    const hobbiesId = req.params.hobbiesId;
    const interset = await interestService.getHobbiesById(req.params.hobbiesId);
    if (!interset) {
      throw new Error("interset not found!");
    }

    await interestService.deleteHobbies(hobbiesId);

    res.status(200).json({
      success: true,
      message: "interset delete successfully!",
      data: interset,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const multipleDelete = async (req, res) => {
  try {
    const { _id } = req.body;
    const result = await Hobbies.deleteMany({ _id: { $in: _id } });
    if (result.deletedCount === 0) {
      throw new Error("No users deleted");
    }
    return res.status(200).send({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      message: `${err}`,
    });
  }
};

  // Delete a multiple banner  or sub banner  with there Id's
  const deleteMultiInterest = async (req, res, next) => {
    try {
      const { Ids } = req.body;
      Ids.map(async (item) => {
        const id = new mongoose.Types.ObjectId(item);
        const interest = await Hobbies.findById(id);
        deleteFiles(interest.logo);
        await Hobbies.deleteOne({ _id: id });
      });
       
      res.status(200).json({
        success: true,
        message: "All selected Hobbies deleted successfully.!",
        // data: result,
      
      });
    } catch (error) {
      next(error);
    }
  };


const updateInterestStatus= async (req, res) => {
 
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const interest = await Hobbies.findById(id);
  
      if (!interest) {
        throw new Error("User not found!");
      }
  
      interest.status = !interest.status;
      const result = await interest.save();
  
      res.status(200).json({
        success: true,
        message: "Hobbies Status Update successfully!!",
        data: result,
      
      });
    } catch (err) {
      next(err);
    }

};

module.exports = {
  createInterest,
  interestList,
  getDetailsById,
  multipleDelete,
  // getInterestList,
  updateInterest,
  updateInterestStatus,
  // manageInterestStatus,
  deleteInterest,
  deleteMultiInterest
};
