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
    validate: {
      isEmail: true
    }
  }, 
  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
