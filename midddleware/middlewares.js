const multer =require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './upload')
    },
    filename: function (req, file, cb) {
       const timestamp = new Date().getTime();
       const userId = req.body.userId || req.body.name
      return cb(null,`${userId}-${timestamp}-${file.originalname}`)
    }
  })
   const upload = multer({ storage })

   module.exports=upload;