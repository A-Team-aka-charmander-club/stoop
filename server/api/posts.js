const router = require('express').Router();
const {
  models: { Photo, User, Post },
} = require('../db');
const { isLoggedIn, isAdmin } = require('./gatekeepingMiddleware');
const { Op } = require('sequelize');

module.exports = router;

router.post('/post', isLoggedIn, async (req, res, next) => {
  try {
    const photo = await Photo.create({
      firebaseUrl: req.body.photo.firebaseUrl,
      firebasePhotoId: req.body.photo.firebasePhotoId,
    });
    const user = req.user;
    user.addPhoto(photo);

    const post = await Post.create({
      title: req.body.post.title,
      description: req.body.post.description,
    });

    user.addPost(post);
    post.addPhoto(photo);

    let combinedPost = await Post.findOne({
      where: {
        id: post.id,
      },
      include: [
        {
          model: Photo,
          where: {
            postId: post.id,
          },
        },
      ],
    });

    res.send(combinedPost);
  } catch (error) {
    next(error);
  }
});
