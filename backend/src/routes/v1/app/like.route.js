const express = require("express");
// const auth = require("../../middlewares/auth");
const { upload } = require("../../../middlewares/upload");
const { likeController } = require("../../../controllers");

const router = express.Router();


router.post('/like-create', likeController.createLike);

router.get('/like/:action', likeController.getLikesByUserId);

router.get('/like-all-list',likeController.getAllUsersWithLikes);
router.get('/like-home',likeController.getLikesByUser);

module.exports = router;