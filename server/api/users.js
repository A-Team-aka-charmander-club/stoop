const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/user', async (req, res, next) => {
  console.log('req.body', req.body);
  console.log('req.body.user', req.body.user);
  try {
    let [user, isCreated] = await User.findOrCreate({
      where: { firebaseUserId: req.body.user.uid },
    });
    console.log('isCreated', isCreated);
    console.log('user from route', user);
    if (isCreated) {
      user = await user.update({
        email: req.body.user.email,
        fullName: req.body.user.fullName,
      });
    }
    res.json(user);
  } catch (err) {
    console.log('from the user');
    next(err);
  }
});
