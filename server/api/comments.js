const router = require('express').Router();
const {
  models: { User, Post, Comment },
} = require('../db');
const { isLoggedIn, isAdmin, verifyUser } = require('./gatekeepingMiddleware');

module.exports = router;

router.post('/:postId/:userId', verifyUser, async (req, res, next) => {
  try {
    const comment = await Comment.create({
      content: req.body.comment,
    });
    let user = req.user;
    await user.addComment(comment);
    let post = await Post.findByPk(req.params.postId);
    await post.addComment(comment);
    //here - do i need to do combined post?
    res.send(comment);
  } catch (err) {
    next(err);
  }
});
