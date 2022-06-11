const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')

const storage = new GridFsStorage({
   url: 'mongodb://localhost:27017/one-blog', // cannot use env
   options: { useNewUrlParser: true, useUnifiedTopology: true },
   file: (req, file) => {
      const match = ['image/png', 'image/jpeg', 'image/gif']

      if (match.indexOf(file.mimetype) === -1) {
         const filename = `${Date.now()}-${file.originalname}`
         return filename
      }
      return {
         bucketName: 'photos',
         filename: `${Date.now()}-${file.originalname}`
      }
   },
})

module.exports = multer({ storage })