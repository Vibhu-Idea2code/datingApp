// const Notification = require("../../models/notification.model");
// const { userService, emailService } = require("../services");

// /** create user */
// const createNotification = async (req, res) => {
//   try {
//     const reqBody = req.body;

//     const notifications = await  Notification.findOne({ email });
//     if (notifications) {
//       throw new Error("User already created by this email!");
//     }

//     const notification = await userService.createUser(reqBody);
//     if (!notification) {
//       throw new Error("Something went wrong, please try again or later!");
//     }

//     res.status(200).json({
//       success: true,
//       message: "User create successfully!",
//       data: { user },
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//     createNotification,
//     getUserList,
//     getUserDetails,
//     updateDetails,
//     deleteUser,
//     sendMail,
//   };