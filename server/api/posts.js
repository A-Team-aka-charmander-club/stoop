const router = require('express').Router();
const {
  models: { Photo, User, Post, Tag },
} = require('../db');
const { isLoggedIn, isAdmin } = require('./gatekeepingMiddleware');
const { Op } = require('sequelize');
const { MaterialIcons } = require('@expo/vector-icons');

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

    await Promise.all(
      req.body.tags.map(async (tag) => {
        console.log(tag, 'tag in promise');
        let [newTag, isCreated] = await Tag.findOrCreate({
          where: {
            name: tag,
          },
        });
        return post.addTag(newTag);
      })
    );

    let combinedPost = await Post.findOne({
      where: {
        id: post.id,
      },
      include: [
        {
          model: Photo,
        },
        {
          model: Tag,
        },
      ],
    });

    res.send(combinedPost);
  } catch (error) {
    next(error);
  }
});

router.delete('/post/:id', async (req, res, next) => {
  try {
    const post = await Post.findOne(req.params.id);
    if (post) {
      await post.destroy();
      res.sendStatus(204);
    } else {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

// router.put();
