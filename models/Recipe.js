const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    ingredients: [{
        name: String,
        quantity: String
    }],
    instructions: [String],
    prepTime: Number,
    cookTime: Number,
    servings: Number,
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard']
    },
    image: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Recipe', RecipeSchema);