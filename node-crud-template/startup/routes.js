const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const corsOptions = require('../config/corsOptions')
const staticOptions = require('../config/staticOptions')
const logging = require('./logging')
const genres = require('../routes/genres')
const customers = require('../routes/customers')
const movies = require('../routes/movies')
const rentals = require('../routes/rentals')
const users = require('../routes/users')
const auth = require('../routes/auth')
const returns = require('../routes/returns')
const captcha = require('../routes/captcha')
const upload = require('../routes/upload')
const md = require('../routes/md')
const notFound = require('../middleware/notFound')

module.exports = function (app) {
  app.use(logging) // logging http
  app.use(cors(corsOptions)) // CORS
  app.use(express.urlencoded({ extended: false })) // content-type formdata
  app.use(express.json()) // content-type json
  app.use(cookieParser()) // cookie add to req obj
  app.use('/static', express.static('static', staticOptions)) // config accessible static
  app.use('/api/genres', genres)
  app.use('/api/customers', customers)
  app.use('/api/movies', movies)
  app.use('/api/rentals', rentals)
  app.use('/api/users', users)
  app.use('/api/auth', auth)
  app.use('/api/returns', returns)
  app.use('/api/upload', upload)
  app.use('/api/captcha', captcha)
  app.use('/api/md', md)
  app.all('*', notFound) // not found handle
}
