const express = require('express')
const cookieParser=require("cookie-parser")
const UserRoute=require("./Routes/user.route")
const RecipeRoute=require("./Routes/recipe.route")
require("dotenv").config();
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
const port = process.env.PORT
require("./config/db")
app.use("/api/v1/auth",UserRoute)
app.use("/api/v2/recipe",RecipeRoute)
app.get("/",(req,res)=>{
    res.send("<center><h1>Recipe Creation App All apis</h1><br>Get All Apis Use My Link <a href=https://github.com/Kotak111 target=_blank>Repository :- Recipe_creation_clone</a></center>")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))