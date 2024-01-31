 const mongoose = require ("mongoose")

 const userSchema= new mongoose.Schema({
  _id:{type:String,},
  name:{type:String,required:true},
  email: {type:String, required:true, unique:true,lowercase: true , match: /^\S+@\S+\.\S+$/,},
  number:{ type:String,unique:true, match: /^\d{10}$/ },
  joiningDate: {type:String, required:true},
  role: {
    type: String,
    
     enum: ['full stack', 'frontend', 'backend', 'mobile app', 'intern', 'project manager', 'sales'],
    required:true
  },
      
        URL: {
          type:String,
          unique:true,
          match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 
       },
       photo: String,
       resume: String,
       addressProof: String,
       identityProof: String,
     
       })
 const User= mongoose.model("User", userSchema);
  module.exports=User;