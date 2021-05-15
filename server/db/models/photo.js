const Sequelize = require('sequelize');
const db = require('../db');

const Photo = db.define('photo', {
  firebasePhotoId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  firebaseUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Photo;
