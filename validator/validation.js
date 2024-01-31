// const validator =require("validator")
const User=require("../model/userSchema");

const uniqueFields = ['email', 'number',"URL"];   
const requiredFields = ['name', 'email', 'number', 'role'];   

const validateUser = async (req, res) => {
    try{
const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
    return res.status(400).json({ error: `Required fields are missing: ${missingFields.join(', ')}` });
   }  
const isValidNumber = /^\d{10}$/.test(req.body.number);
   if (!isValidNumber) {
   return res.status(400).json({ error: 'Invalid number format. Must be 10 digits.' });
    }
const isValidEmail = /^[a-z0-9._-]+@[a-z.-]+\.[a-z]{2,6}$/.test(req.body.email);
    if (!isValidEmail) {
   return res.status(400).json({ error: 'Invalid email format.' });
    }
const existingUser = await User.findOne({
        $or: uniqueFields.map(field => ({ [field]: req.body[field] }))
    });
 const matchedField = uniqueFields.find(field =>existingUser && existingUser[field] === req.body[field]);
    if (matchedField) {
     return res.status(400).json({ error: `User with the same ${matchedField} already exists in the database.` });
    }
}catch(error){
    console.error(error)
    res.status(500).json('internal server error')
}
}

module.exports = validateUser
 
       
        
        