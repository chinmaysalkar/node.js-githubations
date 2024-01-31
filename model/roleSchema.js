const mongoose= require("mongoose")
const User = require("../model/userSchema");
const roleSchema= new mongoose.Schema({
    name:{type:String},
     role:{type :String, required:true},
     user: [{ type: mongoose.Schema.Types.ObjectId, ref: User }]
     


})
const Role = mongoose.model("Role", roleSchema);
module.exports=Role;