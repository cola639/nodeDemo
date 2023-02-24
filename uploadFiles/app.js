const path = require('path')
const express = require('express')
const fileUpload = require('express-fileupload')
const { v1: uuidv1 } = require('uuid')

const filesPayloadExists = require('./middleware/filesPayloadExists')
const fileExtLimiter = require('./middleware/fileExtLimiter')
const fileSizeLimiter = require('./middleware/fileSizeLimiter')
const fileAmountLimiter = require('./middleware/fileAmountLimiter')

const PORT = process.env.PORT || 3600

const app = express()

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// 中间件
app.post(
  '/upload',
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileAmountLimiter,
  fileExtLimiter(['.png', '.jpg', '.jpeg']),
  fileSizeLimiter,
  (req, res) => {
    const files = req.files
    // console.log(files)

    Object.keys(files).forEach(key => {
      const filename = new Date().getTime() + uuidv1() + files[key].name
      const filepath = path.join(__dirname, 'files', filename)
      files[key].mv(filepath, err => {
        // error
        if (err) return res.status(500).json({ status: 'error', message: err })
      })
    })

    return res.json({
      status: 'success',
      message: Object.keys(files).toString()
    })
  }
)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
