const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/user', async (req, res, next) => {
  console.log('user')
  try {
    const user = await User.findOrCreate({
      where: { firebaseUserId: req.body.firebaseUserId, email: req.body.email, fullName: req.body.fullName },
    });
    console.log('user', user);
    res.json(user);
  } catch (err) {
    console.log('from the user')
    next(err);
  }
});
