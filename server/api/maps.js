const router = require('express').Router();
const {
  models: { Post, Photo, Tag, User },
} = require('../db');
const { isLoggedIn, isAdmin } = require('./gatekeepingMiddleware');
const { Op } = require('sequelize');

module.exports = router;

router.get('/coordinates', async (req, res, next) => {
  try {
    console.log(req.query, 'req.query');
    let coordinates = req.query.coordinates;

    coordinates = JSON.parse(coordinates);
    console.log(coordinates);
    let filterTags = coordinates.tags;
    let region = coordinates.region;

    let maxLatitude = region.latitude + region.latitudeDelta;
    let minLatitude = region.latitude - region.latitudeDelta;
    let maxLongitude = region.longitude + region.longitudeDelta;
    let minLongitude = region.longitude - region.longitudeDelta;

    let postPins = await Post.findAll({
      where: {
        latitude: {
          [Op.gt]: minLatitude,
          [Op.lt]: maxLatitude,
        },
        longitude: {
          [Op.gt]: minLongitude,
          [Op.lt]: maxLongitude,
        },
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
        },
      ],
    });
    if (filterTags.length) {
      postPins = postPins.filter((post) => {
        let postTags = post.tags;
        let tagIds = postTags.map((tag) => tag.id);
        let flag = false;
        tagIds.forEach((tag) => {
          if (filterTags.includes(tag)) {
            flag = true;
          }
        });
        if (flag) {
          return post;
        }
      });
    }
    res.send(postPins);
  } catch (err) {
    next(err);
  }
});
