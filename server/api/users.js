const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/user', async (req, res, next) => {
  try {
    const user = await User.findOrCreate({
      where: { firebaseId: req.body.firebaseUserId },
    });
    console.log('user', user);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
