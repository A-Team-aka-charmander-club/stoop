const router = require('express').Router();
const {
  models: { Post, Photo, Tag },
} = require('../db');
const { isLoggedIn, isAdmin } = require('./gatekeepingMiddleware');

module.exports = router;

router.get('/coordinates', async (req, res, next) => {
  try {
    const postPins = await Post.findAll({
      include: [
        {
          model: Photo,
        },
        {
          model: Tag,
        },
      ],
    });
    //   let coordinates = await Post.findAll({
    //     where: {
    //       latitude: {

    //       },
    //       latitude: {

    //       },
    //       longitude: {

    //       },
    //       longitude: {

    //       }
    //     }
    //   })
    res.send(postPins);
  } catch (err) {
    next(err);
  }
});
