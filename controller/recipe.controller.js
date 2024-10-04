const Recipe = require("../models/recipe.model");
const cloudinary=require("../utils/cloudinary")
const fs=require("fs")

//create a recipe
exports.CreateRecipe= async (req,res)=>{
    try {
        const { title, instructions , category , prepTime, cookTime , } = req.body;
        const ingredients = JSON.parse(req.body.ingredients);
        if (!title || !ingredients || !instructions || !category || !prepTime || !cookTime) {
          return res.status(400).json({
            success: false,
            message: "All fields  are required"
          });
        }
    
        if (!req.file) {
          return res.status(400).json({
            success: false,
            message: "Image file is required"
          });
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'dcua1p9ku',
          timeout: 60000
        });
        const RecipePost = new Recipe({
          title,
          ingredients,
          instructions,
          category,
          prepTime,
          cookTime,
    
          image: result.secure_url,
          cloudinary_id: result.public_id,
        });
    
        await RecipePost.save();
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.log("Error deleting file:", err);
          } else {
            console.log("File deleted from server.");
          }
        });
    
        return res.status(200).json({
          success: true,
          message: 'Recipe successfully added',
        });
    
      } catch (error) {
        console.error('Error:', error.response || error);
        return res.status(500).json({
          success: false,
          message: 'Server error',
          error: error.message,
        });
      }
}

// get all recipe
exports.GetAllRecipe =async(req,res)=>{
    try {
        const recipeFind = await Recipe.find();
        if (recipeFind.length > 0) {
          res.json({
            success: true,
            recipeFind: recipeFind
          });
        } else {
          return res.json({
            success: false,
            message: "No Recipe found",
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }
} 

// Get By Id Recipe
exports.GetByIdRecipe= async(req,res)=>{
  try {
      const recipeGet = await Recipe.findById(req.params.id)
    if (recipeGet) {
      res.json({
        success: true,
        recipeGet: recipeGet
      })
    }
  } catch (error) {
    console.log(error);
    
  }
}

//Delete A Recipe
exports.DeleteRecipe = async (req, res) => {
    try {
      let find = await Recipe.findById(req.params.id);
      if (!find) {
        res.json({
          success: true,
          message: "Recipe is not find"
        })
      }
      await cloudinary.uploader.destroy(find.cloudinary_id);
      console.log(find.cloudinary_id);
  
      await find.deleteOne();
      res.json({
        success: true,
        message: "Recipe is deleted"
      })
    } catch (error) {
      console.log(error);
  
    }
  }


//Update A Recipe
exports.UpdateRecipe = async(req,res)=>{
    let recipe = await Recipe.findById(req.params.id);
    const ingredients = JSON.parse(req.body.ingredients);
      // Check if the blog is found
      if (!recipe) {
        return res
          .status(404)
          .json({ success: false, message: "Recipe not found" });
      }
      await cloudinary.uploader.destroy(recipe.cloudinary_id);
      // Upload image to cloudinary
      let result;
      if (req.file) {
         result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'dcua1p9ku',
          timeout: 60000
        });
      }
      const data = {
        title:req.body.title,
        ingredients,
        instructions:req.body.instructions,
        category:req.body.category,
        prepTime:req.body.prepTime,
        cookTime:req.body.cookTime,
        image: result?.secure_url ,
        cloudinary_id: result?.public_id ,
      };
      recipe = await Recipe.findByIdAndUpdate(req.params.id, data, { new: true });
      res.status(200).json({
        success:true,
        message:"Recipe Updated"
      });
  }