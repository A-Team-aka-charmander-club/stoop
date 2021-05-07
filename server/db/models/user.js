const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  firebaseId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = User;
