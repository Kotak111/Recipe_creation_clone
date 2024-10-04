// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: String,
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'],
    default: 'Lunch',
  },
  prepTime: Number, // in minutes
  cookTime: Number, // in minutes
  image:{
    type:String,
    required:true
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  cloudinary_id: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports=Recipe;
