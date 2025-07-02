// server/routes/countries.js
const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

router.get('/', countryController.getAllCountries);
router.get('/:id', countryController.getCountry);

module.exports = router;