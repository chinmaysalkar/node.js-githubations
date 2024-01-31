const express =require ('express');
const mongoose =require ('mongoose');
const body_parser= require ('body-parser');
// const multer =require('multer');
// const User=require("./model/userSchema");
//  const userController = require('./controller/userOP');
 const router=require("./routes/userRoutes")


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
mongoose.connect("mongodb://localhost:27017/job")
.then(()=>console.log("database is connected succesfully "))
.catch((error)=>console.error ("did not connet to the database",error))

app.use (body_parser.urlencoded({extended: false}))
app.use (body_parser.json());
app.use("/", router)


const PORT = process.env.PORT || 8005;
app.listen(PORT, ()=>console.log ("server connected succesfully "))