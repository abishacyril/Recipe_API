const asyncHandler = require('../middleware/asyncHandler');
const Recipe = require('../models/Recipe');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all recipe
// @route   GET /api/v1/recipe
// @access  Public
exports.getRecipes = asyncHandler(async (req, res, next) => {
  //query with mongoose
  const recipes = await Recipe.find().select('name -_id');
  const recipeNames = [];
  recipes.forEach((e) => recipeNames.push(e.name));

  res.status(200).json({ success: true, count: recipes.length, recipeNames });
});

// @desc    Get single recipe
// @route   GET /api/v1/recipe/details/:name
// @access  Public
exports.getRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findOne({
    name: req.params.name,
  });

  if (!recipe) {
    res.status(200).json({});
  }

  res.status(200).json({
    success: true,
    details: {
      ingredients: recipe.ingredients,
      numSteps: recipe.ingredients.length,
    },
  });
});

// @desc    Create new recipe
// @route   POST /api/v1/recipe
// @access  Public
exports.createRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.create(req.body);

  res.status(201).json({ success: true });
});

// @desc    Update recipe
// @route   PUT /api/v1/recipe/:name
// @access  Public
exports.updateRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findOneAndUpdate(
    { name: req.params.name },
    req.body,
    {
      new: true, // parameters required to update the bootcamp
      runValidators: true,
    }
  );

  if (!recipe) {
    return next(
      new ErrorResponse(`${req.params.name} Recipe does not exist`, 404)
    );
  }

  res
    .status(204)
    .json({ success: true, msg: `Update ${req.params.name} recipe` });
});

// @desc    Delete recipe
// @route   DELETE /api/v1/recipe/:name
// @access  Public
exports.deleteRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findOneAndDelete(
    { name: req.params.name },
    req.body
  );

  if (!recipe) {
    return next(
      new ErrorResponse(`${req.params.name} Recipe does not exist`, 404)
    );
  }

  res
    .status(200)
    .json({ success: true, msg: `Delete ${req.params.name} recipe` });
});
