const router = require('express').Router();
const { verifySite } = require('./gatekeepingMiddleware');
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/user', verifySite, async (req, res, next) => {
  try {
    let [newUser, isCreated] = await User.findOrCreate({
      where: { firebaseUserId: req.body.user.uid },
    });
    if (isCreated) {
      newUser = await newUser.update({
        email: req.body.user.email,
        fullName: req.body.user.fullName,
      });
    }
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});
