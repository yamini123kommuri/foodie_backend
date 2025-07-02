// server/routes/recipes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');

console.log('Is auth a function?', typeof auth);

router.get('/', recipeController.getAllRecipes);
router.get('/search', recipeController.searchRecipes);
router.get('/country/:countryId', recipeController.getRecipesByCountry);
router.get('/:id', recipeController.getRecipe);

// Protected routes
router.post('/', auth, recipeController.createRecipe);
router.put('/:id', auth, recipeController.updateRecipe);
router.delete('/:id', auth, recipeController.deleteRecipe);

module.exports = router;
