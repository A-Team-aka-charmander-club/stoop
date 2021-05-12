const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    console.log('HIIIIIIIIII');
    res.send('yayyyyyyyyyy');
  } catch (err) {
    next(err);
  }
});

router.post('/user', async (req, res, next) => {
  try {
    console.log('????????????', req.body);
    const user = await User.findOrCreate({
      where: { firebaseId: req.body.firebaseUserId },
    });
    console.log('user', user);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
