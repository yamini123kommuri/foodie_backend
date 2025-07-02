const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    flagImage: {
        type: String,
        required: true
    },
    popularDishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
});

module.exports = mongoose.model('Country', CountrySchema);