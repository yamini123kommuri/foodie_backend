const Country = require('../models/Country');

// Get all countries
exports.getAllCountries = async (req, res) => {
    try {
        const countries = await Country.find().populate('popularDishes');
        res.json(countries);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get single country
exports.getCountry = async (req, res) => {
    try {
        const country = await Country.findById(req.params.id).populate('popularDishes');
        if (!country) {
            return res.status(404).json({ message: 'Country not found' });
        }
        res.json(country);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};