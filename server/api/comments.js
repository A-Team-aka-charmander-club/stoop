const router = require('express').Router();
const {
  models: { User, Post, Comment },
} = require('../db');
const { isLoggedIn, isAdmin, verifyUser } = require('./gatekeepingMiddleware');

module.exports = router;

router.post('/:postId/:userId', isLoggedIn, async (req, res, next) => {
  console.log('IN COMMENT API ROUTE');
  try {
    const comment = await Comment.create({
      content: req.body,
    });
    await comment.addUser(req.params.userId);
    await comment.addPost(req.params.postId);
    //here - do i need to do combined post?
    res.send(comment);
  } catch (err) {
    next(err);
  }
});
