const express = require('express');
const userController = require('..//controller/userOP');
const upload=require("../midddleware/middlewares")
const router = express.Router();
  const validateUser = require("../validator/validation");


router.get('/users', userController.getAllUsers);
router.get('/users/:role', userController.getAlluserByRole);
router.post('/data',upload.fields([
  {name: 'photo', maxCount: 1 },
  {name: "resume", maxCount:1},
  {name: "addressProof", maxCount:1},
  {name: "identityProof", maxCount:1}
]) ,validateUser,userController.createUser);

router.post("/roles",userController.createRole)
router.put("/update/:userId",upload.fields([
  {name: 'photo', maxCount: 1 },
  {name: "resume", maxCount:1},
  {name: "addressProof", maxCount:1},
  {name: "identityProof", maxCount:1}
]),userController.updateUser)

router.delete("/delete/:userId",userController.deleteUser );
  
  module.exports = router;
