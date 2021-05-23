const router = require('express').Router();
const { verifySite, verifyUser } = require('./gatekeepingMiddleware');
const {
  models: { User, Post, Photo, Tag, Comment },
} = require('../db');
module.exports = router;

router.post('/user', verifySite, async (req, res, next) => {
  try {
    let [newUser, isCreated] = await User.findOrCreate({
      where: { firebaseUserId: req.body.user.uid },
      include: [
        {
          model: Post,
          include: [
            { model: Photo },
            { model: Tag },
            { model: Comment },
            { model: User },
          ],
        },
      ],
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

router.get('/user/:userId', verifyUser, async (req, res, next) => {
  try {
    let userPosts = await User.findOne({
      where: { id: req.params.userId },
      include: [
        {
          model: Post,
          include: [
            { model: Photo },
            { model: Tag },
            { model: Comment },
            { model: User },
          ],
        },
      ],
    });
    res.send(userPosts);
  } catch (error) {
    next(error);
  }
});
