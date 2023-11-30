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

// services/locationService.js

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Earth radius in kilometers
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   const distance = R * c; // Distance in kilometers
//   return distance;
// };

// const toRadians = (degrees) => {
//   return degrees * (Math.PI / 180);
// };


module.exports = { getLocation };
