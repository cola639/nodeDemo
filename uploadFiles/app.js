const path = require('path')
const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const { v1: uuidv1 } = require('uuid')

const filesPayloadExists = require('./middleware/filesPayloadExists')
const fileExtLimiter = require('./middleware/fileExtLimiter')
const fileSizeLimiter = require('./middleware/fileSizeLimiter')
const fileAmountLimiter = require('./middleware/fileAmountLimiter')

const staticOptions = require('./config/staticOptions')

const PORT = process.env.PORT || 3600

const app = express()
app.use(cors())
app.use('/static', express.static('files', staticOptions))

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
    const fileArr = []
    // console.log(Object.keys(files))

    Object.keys(files).forEach(key => {
      const filename = new Date().getTime() + uuidv1() + files[key].name
      const filepath = path.join(__dirname, 'files', filename)
      fileArr.push(filename)
      files[key].mv(filepath, err => {
        // error
        if (err) return res.status(500).json({ status: 'error', message: err })
      })
    })

    return res.json({
      status: 'success',
      message: fileArr
    })
  }
)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
