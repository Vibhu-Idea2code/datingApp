// const express = require('express');
// const {locationController} = require('../../controllers');

// const router = express.Router();

// router.get('/get-location', locationController.getLocation);

// module.exports = router;

// src/routes/locationRoutes.js
const express = require('express');
const {locationController} = require('../../controllers');
const router = express.Router();

// router.post('/create', locationController.createLocation);
// router.get('/', locationController.getLocations);
// router.get('/:id', locationController.getLocationById);
// router.put('/:id', locationController.updateLocation);
// router.delete('/:id', locationController.deleteLocation);
// router.get('/within-miles', locationController.getHomePage);
// router.get('/get-location', locationController.getHomePage);
router.get('/location/:latitude/:longitude', locationController.getLocation);
module.exports = router;

