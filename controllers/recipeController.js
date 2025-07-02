const Recipe = require('../models/Recipe');
const Country = require('../models/Country');

// Get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('country', 'name flagImage');
        res.json(recipes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get recipes by country
exports.getRecipesByCountry = async (req, res) => {
    try {
        const countryId = req.params.countryId;
        const recipes = await Recipe.find({ country: countryId }).populate('country', 'name flagImage');
        res.json(recipes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get single recipe
exports.getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('country', 'name flagImage');
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Search recipes
exports.searchRecipes = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const recipes = await Recipe.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { 'ingredients.name': { $regex: searchTerm, $options: 'i' } }
            ]
        }).populate('country', 'name flagImage');
        
        res.json(recipes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create new recipe (POST /recipes)
exports.createRecipe = async (req, res) => {
    try {
        const { name, ingredients, instructions, prepTime, cookTime, servings, difficulty, country, image } = req.body;
        
        const newRecipe = new Recipe({
            name,
            ingredients,
            instructions,
            prepTime,
            cookTime,
            servings,
            difficulty,
            country,
            image,
            createdBy: req.user.id
        });

        const savedRecipe = await newRecipe.save();
        const populatedRecipe = await Recipe.findById(savedRecipe._id).populate('country', 'name flagImage');
        res.status(201).json(populatedRecipe);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update recipe (PUT /recipes/:id)
exports.updateRecipe = async (req, res) => {
    try {
        const { name, ingredients, instructions, prepTime, cookTime, servings, difficulty, country, image } = req.body;
        
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { 
                name,
                ingredients,
                instructions, 
                prepTime,
                cookTime,
                servings,
                difficulty,
                country,
                image
            },
            { new: true }
        ).populate('country', 'name flagImage');

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json(updatedRecipe);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete recipe (DELETE /recipes/:id) 
exports.deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json({ message: 'Recipe deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};