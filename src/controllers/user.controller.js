const { userService } = require("../services");

const createUser = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody, "++++++user");
    const user = await userService.createUser(reqBody);
    if (!user) {
      throw new Error("no such user");
    }
    res.status(200).json({
      message: "Successfully created a new user",
      success: true,
      data: { user },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getUserList = async (req, res) => {
  try {
    let user = await userService.getUserList(req, res);
    res.status(200).json({
      message: "successfully fetched all users",
      status: true,
      data: user ,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getUserId = async (req, res) => {
  try {
    const user = await userService.getUserId(req.params.userId);
    if (!user) {
      throw new Error("No Such User Found!!!");
    }
    res.status(200).json({
      message: `Fetched the details of ${user._id}`,
      data: { user },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userService.deleteUserId(userId);
    res.status(200).json({
      message: "Deleted Successfully",
      data: { user },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userEx = await userService.getUserId(userId);
    if (!userEx) {
      throw new Error("userId does not exist");
    }
    await userService.updateUser(userId, req.body);
    res.status(201).json({
      success: true,
      message: "successfully updated",
      data: { userEx },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { createUser, getUserList, getUserId, deleteUser,updateUser };