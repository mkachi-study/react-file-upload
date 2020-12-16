const express = require('express')
const path = require('path')
const cors = require('cors')
const multer = require('multer')

const app = express()
const port = 9003

app.use(cors())
app.use(express.static('assets'))
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

const storage = multer.diskStorage({
  destination: './assets',
  filename: (req, file, callback) => {
    callback(null, 'image_' + Date.now() + path.extname(file.originalname))
  }
})

const uploader = multer({
  storage: storage
})

app.post('/upload', uploader.single('img'), (req, res) => {
  try {
    console.log(req.file.filename)
    res.json({
      success: true,
      data: `http://localhost:9003/${req.file.filename}`
    })
  } catch (error) {
    res.json({
      success: false,
      data: error.message
    })
  }
})

app.listen(port, () => {
  console.log(`file server running at ${port}`)
})
