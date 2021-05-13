'use strict';

const { db, models } = require('./server/db/');
const Sequelize = require('sequelize');
const posts = require('./seedData/Post');
const comments = require('./seedData/Comment');
const tags = require('./seedData/Tag');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

// const PostSchema = {
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
//   description: {
//     type: Sequelize.TEXT,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
//   latitude: {
//     type: Sequelize.FLOAT,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
//   longitude: {
//     type: Sequelize.FLOAT,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
//   primaryUrl: {
//     type: Sequelize.TEXT,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
// };

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  await models.Post.bulkCreate(posts);
  await models.Comment.bulkCreate(comments);
  await models.Tag.bulkCreate(tags);
  console.log('db synced!');
  //const posts = await models.Post.bulkCreate();
  console.log(`seeded successfully`);
}

//const fakePostData = generateEntryFromModel(models.Post);

// const fakePost = {
//   title: fakePostData.title,
//   description: fakePostData.description,
//   latitude: fakePostData.latitude,
//   longitude: fakePostData.longitude,
//   primaryUrl: fakePostData.primaryUrl,
// };

//const fakePostArray = [fakePost, fakePost, fakePost, fakePost, fakePost];

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
