const {
  models: { User },
} = require('../db');

const isLoggedIn = async (req, res, next) => {
  try {
    console.log('IN GATEKEEPING');
    const user = await User.findOne({
      where: {
        firebaseUserId: req.headers.authorization,
      },
    });
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(404).send('Please log in!');
    }
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        firebaseUserId: req.headers.authorization,
      },
    });
    if (user.firebaseUserId !== Number(req.params.userId)) {
      return res.status(409).send('This is not for you!');
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send('You are not an admin!');
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isLoggedIn,
  verifyUser,
  isAdmin,
};
