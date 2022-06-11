const mongoose = require('mongoose')

module.exports.connectdb = () => {
   mongoose.connect(process.env.DB_CONNECTION,
      { useNewUrlParser: true, useUnifiedTopology: true },
      { serverSelectionTimeoutMS: 2000 }
   )
   mongoose.connection.on('error', err => console.log(`MongoDB connection error: ${err}`))
   console.log('Connected to database')
}