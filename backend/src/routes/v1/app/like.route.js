const express = require("express");
// const auth = require("../../middlewares/auth");
const { upload } = require("../../../middlewares/upload");
const { likeController } = require("../../../controllers");

const router = express.Router();


router.post('/like-create', likeController.createLike);

router.get('/like/:touserid', likeController.getLikesByUserId);

router.get('/like-all-list',likeController.getAllUsersWithLikes);
module.exports = router;