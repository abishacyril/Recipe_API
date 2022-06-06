const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: [true, 'Recipe already exists'],
    trim: true,
  },
  ingredients: [String],
  instructions: [String],
});

module.exports = mongoose.model('Recipe', RecipeSchema);
