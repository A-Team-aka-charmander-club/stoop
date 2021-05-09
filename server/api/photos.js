const router = require('express').Router();
const {
  models: { Photo },
} = require('../db');
module.exports = router;

router.post('/photo', async (req, res, next) => {
  try {
    const photo = await Photo.create({
      firebaseUrl: req.body.photoUrl,
      firebaseId: req.body.firebasePhotoId,
    });
    res.json(photo);
  } catch (err) {
    next(err);
  }
});
