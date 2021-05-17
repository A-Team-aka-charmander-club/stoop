const router = require('express').Router();
const {
  models: { Photo, User, Post, Tag },
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
    await user.addPhoto(photo);

    const post = await Post.create({
      title: req.body.post.title,
      description: req.body.post.description,
      latitude: req.body.post.latitude,
      longitude: req.body.post.longitude,
    });

    await user.addPost(post);
    await post.addPhoto(photo);
    await Promise.all(req.body.tags.map((tag)=> {
      await Tag.findOrCreate({where: {
        name: tag
      }})
      return post.addTag(tag)
    }))


    let combinedPost = await Post.findOne({
      where: {
        id: post.id,
      },
      include: [
        {
          model: Photo,
          Tag,
        },
      ],
    });

    res.send(combinedPost);
  } catch (error) {
    next(error);
  }
});
