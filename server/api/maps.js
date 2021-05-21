const router = require('express').Router();
const {
  models: { Post, Photo, Tag, User },
} = require('../db');
const { isLoggedIn, isAdmin } = require('./gatekeepingMiddleware');
const { Op } = require("sequelize");

module.exports = router;

router.get('/coordinates', async (req, res, next) => {
  try {
    let region = req.query.region
    region = JSON.parse(region);
    let maxLatitude = region.latitude + region.latitudeDelta;
    let minLatitude = region.latitude - region.latitudeDelta;
    let maxLongitude = region.longitude + region.longitudeDelta;
    let minLongitude = region.longitude - region.longitudeDelta
    
    const postPins = await Post.findAll({
      where: {
        latitude: {
          [Op.gt]: minLatitude,
          [Op.lt]: maxLatitude 
        }, 
        longitude: {
          [Op.gt]: minLongitude,
          [Op.lt]: maxLongitude 
        }
      },
      include: [
        {
          model: Photo,
        },
        {
          model: Tag,
        },
        { 
          model: User 
        },
      ],
    });
    res.send(postPins);
  } catch (err) {
    next(err);
  }
});
