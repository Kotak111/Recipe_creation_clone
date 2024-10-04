const RecipeController=require("../controller/recipe.controller");
const { auth, IsUser } = require("../utils/auth");
const upload=require("../utils/image.add")
const router=require("express").Router();
router.post("/addrecipe",auth,IsUser,upload.single("image"),RecipeController.CreateRecipe)
router.get("/",auth,IsUser,RecipeController.GetAllRecipe)
router.get("/:id",auth,IsUser,RecipeController.GetByIdRecipe)
router.delete("/:id",auth,IsUser,RecipeController.DeleteRecipe)
router.patch("/:id",auth,IsUser,upload.single("image"),RecipeController.UpdateRecipe)

module.exports=router;