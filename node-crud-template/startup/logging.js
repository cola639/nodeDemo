const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')

module.exports = function () {
  // winston.handleExceptions(
  //   new winston.transports.Console({ colorize: true, prettyPrint: true }),
  //   new winston.transports.File({ filename: './logs/uncaughtExceptions.log' })
  // )

  // process.on('unhandledRejection', (ex) => {
  //   throw ex
  // })

  // winston.add(winston.transports.File, { filename: './logs/logfile.log' })
  // write in mongodb
  winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost:27017/vidly',
    level: 'info'
  })
}
