const express = require("express");
// const auth = require("../../middlewares/auth");
const { upload } = require("../../middlewares/upload");
const { likeController } = require("../../controllers");

const router = express.Router();


router.post('/like-create/:userId', likeController.createLike);

router.get('/like/:userId', likeController.getLikesByUserId);
module.exports = router;