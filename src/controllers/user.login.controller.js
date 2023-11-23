const { userService, emailService, adminService } = require("../services");

const sendMail = async (req, res) => {
    try {
      const reqBody = req.body;
      console.log("get req body");
      const sendEmail = await emailService.sendMail(
        reqBody.email,
        reqBody.subject,
        reqBody.text
      );
      console.log("Send Done..");
      if (!sendEmail) {
        throw new Error("Something went wrong, please try again or later.");
      }
  
      res
        .status(200)
        .json({ success: true, message: "Email send successfully!" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
//   const sendEmailVerification = async (req, res) => {
//     try {
//         const reqBody = req.body;
//         console.log("get req body");
//         const sendEmail = await emailService.sendEmailVerification(
//             reqBody.email,
//             reqBody.subject,
//             reqBody.text
//             );
//             console.log("Send Done..");
//             if (!sendEmail) {
//                 throw new Error("Something went wrong, please try again or later.");
//                 }
//                 res
//                 .status(200)
//                 .json({ success: true, message: "Email send successfully!" });
//                 } catch (error) {
//                     res.status(400).json({ success: false, message: error
//                         .message });
//                         }
//                         };
  module.exports={
    sendMail,
  }