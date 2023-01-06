const winston = require('winston')
const express = require('express')
const app = express()

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')() // 引入自启动函数
require('./startup/validation')()

const port = process.env.PORT || 3000
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`))

module.exports = server
s
