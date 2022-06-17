const express = require('express')

const FileController = require('../controllers/FileController')
const upload = require('../middlewares/upload')
const constants = require('../configs/constants')
const Message = require('../configs/message')

const router = express.Router()

router.get('/:filename', async (req, res) => {
   try {
      const gfs = await FileController.opengfs()
      const file = await FileController.findOne(req.params.filename, gfs)
      console.log(file)
      if (!file) return res.status(400).json({ message: Message.File.not_exist })

      const readStream = FileController.read(file.filename)
      readStream.pipe(res)
      /*
      * Error: grid.mongo.GridStore is not a constructor
      * Solve: change mongoose version from 6.x.x to 5.13.7 but get warning deprecated
      * Try another way: use mongodb instead of mongoose
      */
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
})

router.delete('/:filename', async (req, res) => {
   try {
      const gfs = await FileController.opengfs()
      const file = await FileController.deleteOne(req.params.filename, gfs)
      if (!file) res.status(400).json({ message: Message.File.not_exist })
      res.status(200).json(file)
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
})

router.post('/upload', upload.single('file'), async (req, res) => {
   if (req.file === undefined) res.status(400).json({ message: Message.File.choose_file })
   const imgUrl = constants.fileBaseURL + `${req.file.filename}`
   return res.json(imgUrl)
})

router.delete('/del/del', async (req, res, next) => {
   const filenames = req.body.filenames
   if (!filenames || filenames.length == 0) {
      return res.status(400).json({ message: Message.File.choose_file })
   }
   try {
      const files = await FileController.findByName(filenames)
      const files_id = files.map((file) => {
         return file['_id']
      })
      const deleted_files = await FileController.deleteManyFiles(files_id)
      const deleted_chunks = await FileController.deleteManyChunks(files_id)
      res.status(200).json({ deleted_files, deleted_chunks })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }

})

module.exports = router