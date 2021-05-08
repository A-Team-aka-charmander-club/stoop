const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.post('/user', async (req, res, next) => {
  console.log('body')
  try {
    const user = await User.create(req.body)
    res.json()
  } catch (err) {
    next(err)
  }
})