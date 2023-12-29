const { Sign } = require("../../models");
const { zodiacService } = require("../../services");

const createZodiac = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody, "++++++Zodiac");
    const zodiac = await zodiacService.createSign(reqBody);
    if (!zodiac) {
      throw new Error("no such Zodiac");
    }
    res.status(200).json({
      message: "Successfully created a new zodiac",
      success: true,
      data: { zodiac },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getZodiacList = async (req, res) => {
  try {
    let zodiac = await zodiacService.getSignList(req, res);
    res.status(200).json({
      message: "successfully fetched all zodiac",
      status: true,
      data: zodiac ,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getZodiacId = async (req, res) => {
  try {
   const  zodiac=await zodiacService.getSignById(req.params.signId)
    console.log(req.params.signId);
    if (!zodiac) {
      throw new Error("No Such zodiac Found!!!");
    }
    res.status(200).json({
      message: `Fetched the details of ${zodiac._id}`,
      data: { zodiac },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteZodiac = async (req, res) => {
    try {
      const signId = req.params.signId;
      const zodiac = await  zodiacService.getSignById(signId);
      if (!zodiac) {
        throw new Error("pets not found!");
      }
  
      await zodiacService.deleteSign(signId);
  
      res.status(200).json({
        success: true,
        message: "zodiac delete successfully!",
        data: zodiac,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

const updateZodiac = async (req, res) => {
  try {
    const signId = req.params.signId;
    const zodiac = await zodiacService.getSignById(signId);
    if (!zodiac) {
      throw new Error("zodiac does not exist");
    }
    await zodiacService.updateSign(signId, req.body);
    res.status(201).json({
      success: true,
      message: "successfully updated",
      data: { zodiac },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const multipleDelete = async (req, res) => {
  try {
    const { _id } = req.body;
    const result = await Sign.deleteMany({ _id: { $in: _id } });
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
module.exports = { createZodiac, getZodiacList, getZodiacId, deleteZodiac,updateZodiac ,multipleDelete};