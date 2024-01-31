const User = require("../model/userSchema");
const Role =require("../model/roleSchema");
const path = require('path'); 
const fs = require('fs');



const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(201).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAlluserByRole: async(req,res)=>{
     try{
      const role = req.params.role;
        const users = await User.find({ role: role });
        res.status(200).json(users);

     }catch(error){
      console.error(error)
      res.status(500).json("internal server error")
     }
    },

    createRole:async (req,res)=>{
      try{
        const user= new Role({
          role:req.body.role,
          name:req.body.name,
         user:[],
        })
        const result= await user.save(user)
        res.status(201).json(result)

      }catch(error){
        console.error(error)
        res.status(500).json("internal server error")
      }
    },

    createUser: async (req, res) => {
      
  
        try {
          const maxUserId = await User.findOne({}, { _id: 1 }, { sort: { _id: -1 } }).exec();
          const startingId = maxUserId ? parseInt(maxUserId._id.split('-')[1]) + 1 : 1;
          const newUserId = `RAK-${startingId.toString().padStart(4, '0')}`;
      
          const newUser = new User({
            _id: newUserId,
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            joiningDate: req.body.joiningDate,
            role: req.body.role,
            URL: req.body.URL,
            photo: req.files && req.files['photo'] ? req.files['photo'][0].path : null,
            resume: req.files && req.files['resume'] ? req.files['resume'][0].path : null,
            addressProof: req.files && req.files['addressProof'] ? req.files['addressProof'][0].path : null,
            identityProof: req.files && req.files['identityProof'] ? req.files['identityProof'][0].path : null,
          });
      
          console.log('req.body:', req.body);
          console.log('req.files:', req.files);
      
          const result = await newUser.save();
          res.status(201).json(result);
        } catch (error) {
          console.error(error);
          res.status(500).json("Internal server error");
        }
      },

      deleteUser:  async (req,res)=>{
        try{
         const userIdToDelete= req.params.userId;
         const deleteUser =await User.findByIdAndDelete({_id:userIdToDelete})
           console.log(deleteUser);
   
       return deleteUser
       ? res.status(200).json(deleteUser)
       : res.status(404).json({ error: 'User not found' });
         }catch(error){
         console.log(error)
         res.status(500).json("server error",error)
        }
     },

       
     updateUser: async (req,res)=>{
      try{
        const user = await User.findById(req.params.userId);
          if (!user){
              res.status(404).json("user not found ")
          }
           user.name = req.body.name|| user.name;
           user.email = req.body.email  || user.email;
           user.number =req.body.number || user.number ;
           user.joiningDate =req.body.joiningDate|| user.joiningDate;
           user.role = req.body.role || user.role;
           user.URL =req.body.URL || user.URL;
           
           user.photo = updateFile(req.files['photo'], user.photo,user.name);
           user.resume = updateFile(req.files['resume'], user.resume,user.name);
           user.addressProof = updateFile(req.files['addressProof'], user.addressProof,user.name);
           user.identityProof = updateFile(req.files['identityProof'], user.identityProof,user.name);
          
           function updateFile(newFiles, oldFilePath) {
            if (newFiles && newFiles.length > 0) {
              const timestamp = new Date().getTime();
              const newFileName = `${user.name}-${timestamp}-${newFiles[0].originalname}`;
              const newPath = path.join('./upload', newFileName);
      
                    fs.unlinkSync(oldFilePath);
                    fs.renameSync(newFiles[0].path, newPath);
                    return newPath.replace(/\//g, '\\');
            } else {
                return oldFilePath;
            }
        }
          const result = await user.save();
           return res.status(200).json(result);
           }catch (error){
          console.log(error)
          return res.status(500).json("server error", error)
      }
  },
}
      
module.exports = userController;
