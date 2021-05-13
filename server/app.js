const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()

const cors = require('cors');
app.use(cors({origin: true, credentials: true}));

app.use(express.json());

app.use(morgan('dev'))

app.use('/api', require('./api'))

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

module.exports = app
