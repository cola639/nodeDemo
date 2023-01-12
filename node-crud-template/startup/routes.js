const express = require('express')
const cors = require('cors')
const corsOptions = require('../config/corsOptions')
const staticOptions = require('../config/staticOptions')
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
const error = require('../middleware/error')

module.exports = function (app) {
  app.use(express.json())
  app.use(cors(corsOptions))
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
  app.use(error)
}
