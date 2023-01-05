const express = require('express')
const app = express()
const config = require('config')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const user = require('./routes/user')

app.use(cors(corsOptions)) // cors middleware
app.use('/api/user', user)

const port = process.env.PORT || config.get('port')
app.listen(port, () => console.log(`Listening on port ${port}...`))
