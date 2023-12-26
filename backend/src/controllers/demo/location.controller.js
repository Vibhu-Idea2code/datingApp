// src/controllers/locationController.js
const Location = require('../../models/location.model');
// const locationService = require('../services/locationService');

exports.createLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/locationController.js
// const Location = require('../models/Location');


const getLocationsWithinMiles = async (req, res) => {
  const { latitude, longitude, miles } = req.query;

  try {
    // Find locations within the specified distance
    const locations = await Location.find({
      $where: function () {
        const distance = locationService.calculateDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          this.latitude,
          this.longitude
        );
        return distance <= parseFloat(miles);
      },
    });

    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getLocationsWithinMiles,
};
