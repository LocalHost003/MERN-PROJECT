const Alert = require('../models/alert');

// @desc    Create a new emergency alert
// @route   POST /api/alerts
// @access  Public
const createAlert = async (req, res) => {
  try {
    const { name, location, emergencyType, contact, message } = req.body;

    // Check required fields
    if (!name || !location || !emergencyType || !contact) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    const newAlert = new Alert({
      name,
      location,
      emergencyType,
      contact,
      message
    });

    await newAlert.save();
    res.status(201).json({ message: 'Emergency alert submitted successfully' });

  } catch (error) {
    console.error('Error creating alert:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createAlert,
};
