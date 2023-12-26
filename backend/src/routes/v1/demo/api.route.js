const express = require("express");
const { apiController } = require("../../../controllers");
const router = express.Router();

router.post("/create", apiController.createApi);

// router.get('/list-pets',
// apiRoute.petList);

// router.get('/list-sexual',
// apiRoute.sexualList);

// router.get('/list-sign',
// apiRoute.signList);

module.exports = router;
