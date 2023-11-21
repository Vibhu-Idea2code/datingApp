const express = require("express");

const { userController } = require("../../controllers");

const router = express.Router();

// create user
// router.post(
//   "/create-user",
//   userController.register
// );

// get user list
router.get("/list", userController.getUserList);

/**get user list by id */
router.get("/user-id/:userId", userController.getUserId);

/**delete user  */
router.delete("/delete/:userId", userController.deleteUser);

router.put("/update-user/:userId",userController.updateUser);

// router.post("/create-user", authController.register);

// router.post("/login", authController.login);
module.exports = router;