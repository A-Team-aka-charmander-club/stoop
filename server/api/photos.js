const router = require('express').Router();
const {
  models: { Photo },
} = require('../db');
const { isLoggedIn, isAdmin } = require('./gatekeepingMiddleware');

module.exports = router;

router.post('/photo', isLoggedIn, async (req, res, next) => {
  try {
    console.log('a photo is sending!!!!!!!!!!!');
    const photo = await Photo.create({
      firebaseUrl: req.body.photoUrl,
      firebasePhotoId: req.body.firebasePhotoId,
    });
    res.json(photo);
  } catch (err) {
    next(err);
  }
});
