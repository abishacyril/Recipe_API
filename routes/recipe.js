const express = require('express');
const {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipe');

const router = express.Router();

router.route('/').get(getRecipes).post(createRecipe);

router.route('/:name').put(updateRecipe).delete(deleteRecipe);

router.route('/details/:name').get(getRecipe);

module.exports = router;
