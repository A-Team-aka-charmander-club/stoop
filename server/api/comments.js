const router = require('express').Router();
const {
  models: { User, Post, Comment },
} = require('../db');
const { isLoggedIn, isAdmin, verifyUser } = require('./gatekeepingMiddleware');

module.exports = router;
// why is this verifyuser and not isloggedin?
router.post('/:postId/:userId', verifyUser, async (req, res, next) => {
  try {
    const comment = await Comment.create({
      content: req.body.comment,
    });
    let user = req.user;
    await user.addComment(comment);
    let post = await Post.findByPk(req.params.postId);
    await post.addComment(comment);
    const fullComment = await Comment.findOne({
      where: {
        id: comment.id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'fullName'],
        },
      ],
    });
    console.log('FULL COMMENT: ', fullComment);
    //here - do i need to do combined post?
    res.send(fullComment);
  } catch (err) {
    next(err);
  }
});

router.get('/:postId', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId },
      include: [
        {
          model: User,
          attributes: ['id', 'fullName'],
        },
      ],
    });
    res.send(comments);
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId/:commentId', verifyUser, async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    if (comment) {
      await comment.destroy();
      res.send(comment);
    }
  } catch (err) {
    next(err);
  }
});
