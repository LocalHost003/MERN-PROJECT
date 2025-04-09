const express = require('express');
const router = express.Router();
const { createAlert } = require('../controllers/alertController');

// Route to handle new alert submissions
router.post('/', createAlert);

module.exports = router;
