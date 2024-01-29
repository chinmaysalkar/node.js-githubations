const express = require('express');
const router = express.Router();
const multer = require('multer');

const userController = require("../controller/userController")

// to store data at particular location
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Folder to store uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
const upload = multer({ storage: storage });

router.get('/list', userController.getUsers);
router.get('/list/:role', userController.getUsersByRole);

router.post("/create",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "identityProof", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
  ]),
  userController.createUser
);



module.exports = router;


