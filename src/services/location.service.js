const {Location} = require('../models');

const getLocation = async (latitude, longitude) => {
  return Location.findOne({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude], // MongoDB expects [longitude, latitude]
        },
        $maxDistance: 10000, // Maximum distance in meters (adjust as needed)
      },
    },
  });
};

module.exports = { getLocation };
