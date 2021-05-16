const router = require('express').Router();
const {
  models: { Post },
} = require('../db');
const { isLoggedIn, isAdmin } = require('./gatekeepingMiddleware');

module.exports = router;

router.get('/coordinates', async (req, res, next) => {
    console.log('inside of the map')
    console.log(req.body.region, 'bodyyy')
    try {
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
      console.log('here')
      res.json([]);
    } catch (err) {
      next(err);
    }
  });