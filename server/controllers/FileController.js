const Grid = require('gridfs-stream')
const mongoose = require('mongoose')


const file = {}

file.opengfs = () => {
   return new Promise((resolve, reject) => {
      let gfs
      mongoose.connect(process.env.DB_CONNECTION,
         { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
         { serverSelectionTimeoutMS: 2000 }
      ).then(() => {
         gfs = Grid(mongoose.connection.db, mongoose.mongo)
         gfs.collection('photos')
         resolve(gfs)
      }).catch((err) => {
         reject(err)
      })
   })
}

file.find = () => {
   return new Promise((resolve, reject) => {
      mongoose.connection.db.collection('photos.files').find().toArray()
         .then((res) => {
            resolve(res)
         }).catch((err) => {
            reject(err)
         })
   })
}

/**
 * 
 * @param {Array} filenames - array string filename
 * @returns 
 */
file.findByName = (filenames) => {
   return new Promise((resolve, reject) => {
      mongoose.connection.db.collection('photos.files').find({ filename: { $in: filenames } }).toArray()
         .then((res) => {
            resolve(res)
         }).catch((err) => {
            reject(err)
         })
   })
}

/**
 * 
 * @param {string} filename 
 * @param {Grid colleciion} gfs 
 * @returns 
 */
file.findOne = (filename, gfs) => {
   return new Promise((resolve, reject) => {
      gfs.files.findOne({ filename: filename })
         .then((res) => {
            resolve(res)
         }).catch((err) => {
            reject(err)
         })
   })
}

file.deleteOne = (filename, gfs) => {
   return new Promise((resolve, reject) => {
      gfs.files.deleteOne({ filename: filename })
         .then((res) => {
            resolve(res)
         }).catch((err) => {
            reject(err)
         })
   })
}

file.deleteFileAndChunk = (file_id) => {
   return new Promise((resolve, reject) => {
      const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'photos' })
      gridFSBucket.delete(file_id)
         .then(res => resolve(res))
         .catch(err => reject(err))
   })
}



/**
 * delete files
 * @param {Array} filter_id - array id of files you want to delete
 * @returns "deleted_files": {
                "n": 0, - number of file has been deleted
                "ok": 1 - delete boolean status 
            }
 */
file.deleteManyFiles = (files_id) => {
   return new Promise((resolve, reject) => {
      const files = mongoose.connection.db.collection('photos.files')
      files.deleteMany({ _id: { $in: files_id } })
         .then((res) => {
            resolve(res.result)
         }).catch((err) => {
            reject(err)
         })
   })
}

/**
 * delete files data
 * @param {Array} filter_id - array id of files you want to delete
 * @returns "deleted_chunks": {
                "n": 0, - number of file has been deleted
                "ok": 1 - delete boolean status 
            }
 */
file.deleteManyChunks = (files_id) => {
   return new Promise((resolve, reject) => {
      const chunks = mongoose.connection.db.collection('photos.chunks')
      chunks.deleteMany({ files_id: { $in: files_id } })
         .then((res) => {
            resolve(res.result)
         }).catch((err) => {
            reject(err)
         })
   })
}

/**
 * 
 * @param {string} filename 
 * @returns readStream
 */
file.read = (filename) => {
   /**
    * use gridstore: const readStream = gfs.createReadStream(file.filename) will deprecated
    */
   const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'photos' })
   const readStream = gridFSBucket.openDownloadStreamByName(filename)
   return readStream
}

module.exports = file