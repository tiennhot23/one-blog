const express = require('express')
const cors = require('cors')

const conn = require('./connection')
const posts = require('./routers/posts')
const files = require('./routers/files')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

conn.connectdb()

app.use('/posts', posts)
app.use('/file', files)


app.listen(port, () => console.log(`Listening on port ${port}`))

