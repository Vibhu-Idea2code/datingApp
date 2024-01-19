const express = require("express");
// const auth = require("../../middlewares/auth");
const { upload } = require("../../../middlewares/upload");
const { boostController } = require("../../../controllers");

const router = express.Router();


router.post('/boost-create', boostController.createBoost);
router.get('/boost', boostController.getBoostList);

// router.put("/updateNotificationStatus/:id",NotificationController.updateNotificationStatus);

// router.get('/boost/:action', boostController.getLikesByUserId);

// router.get('/like-all-list',boostController.getAllUsersWithLikes);
// router.get('/like-home',boostController.getLikesByUser);

module.exports = router;