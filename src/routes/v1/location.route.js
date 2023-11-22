// const express = require('express');
// const {locationController} = require('../../controllers');

// const router = express.Router();

// router.get('/get-location', locationController.getLocation);

// module.exports = router;

// src/routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const {locationController} = require('../../controllers');

router.post('/create', locationController.createLocation);
router.get('/', locationController.getLocations);
router.get('/:id', locationController.getLocationById);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);

module.exports = router;

