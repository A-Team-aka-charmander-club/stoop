const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  firebaseUserId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
  },
  fullName: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
