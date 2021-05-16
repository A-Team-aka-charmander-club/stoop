const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/photos', require('./photos'));
router.use('/posts', require('./posts'));
router.use('/maps', require('./maps'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
