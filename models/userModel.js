const { default: mongoose } = require('mongoose');




const schemaData = mongoose.Schema({
    id: {type:String,default: 'RAK0001',required: true,unique: true},
    name: {type:String},
    email: {type:String},
    number: {type:Number},
    date: {type:String},
    role: {type:String, enum:['backend', 'frontend', 'intern']},
    link: {type:String},
    photo: {type:String},
    resume: {type:String},
    identityProof: {type:String},
    addressProof: {type:String}
})



const userModel = mongoose.model("user", schemaData);

module.exports = userModel;