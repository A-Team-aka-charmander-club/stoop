
const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

router.use((req, res, next) => {
  console.log('index')
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})