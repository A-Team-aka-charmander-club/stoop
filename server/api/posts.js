const router = require('express').Router();
const {
  models: { Photo, User, Post, Tag, Comment },
} = require('../db');
const { isLoggedIn, isAdmin, verifyUser } = require('./gatekeepingMiddleware');
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

    await Promise.all(
      req.body.tags.map(async (tag) => {
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
        {
          model: User,
          attributes: ['id'],
        },
        {
          model: Comment,
        },
      ],
    });

    res.send(combinedPost);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/:userId', verifyUser, async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      await post.destroy();
      res.send(post);
    } else {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id/:userId', verifyUser, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Tag }],
    });
    if (post) {
      //if sending an updated photo, must do this first
      if (!req.body.photo.id) {
        //first get rid of the association btwn the old photo and the post
        const oldPhoto = await Photo.findOne({
          where: {
            userId: req.params.id,
          },
        });
        await post.removePhoto(oldPhoto);

        const photo = await Photo.create({
          firebaseUrl: req.body.photo.firebaseUrl,
          firebasePhotoId: req.body.photo.firebasePhotoId,
        });

        const user = req.user;
        await user.addPhoto(photo);
        await post.addPhoto(photo);
      }
      await post.update(req.body.post);
      await post.removeTags(post.tags);

      await Promise.all(
        req.body.tags.map(async (tag) => {
          let [newTag, isCreated] = await Tag.findOrCreate({
            where: {
              name: tag,
            },
          });
          return post.addTag(newTag);
        })
      );
      let updatedPost = await Post.findOne({
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
          {
            model: User,
            attributes: ['id'],
          },
          {
            model: Comment,
          },
        ],
      });

      res.send(updatedPost);
    } else {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});
