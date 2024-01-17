const express = require("express");
// const auth = require("../../middlewares/auth");
const { upload } = require("../../../middlewares/upload");
const { superLikeController } = require("../../../controllers");

const router = express.Router();


router.post('/superlike-create', superLikeController.createLike);

router.get('/superlike/:touserid', superLikeController.getSuperLikesByUserId);

router.get('/superlike-all-list',superLikeController.getAllUsersWithSuperLikes);

module.exports = router;