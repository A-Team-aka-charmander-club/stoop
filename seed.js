'use strict';

const { db, models } = require('./server/db/');
const Sequelize = require('sequelize');
// const posts = require('./seedData/Post');
// const comments = require('./seedData/Comment');
// const tags = require('./seedData/Tag');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const users = [
  {
    firebaseUserId: 'rguUa7Q5ZkRoARLJGayzPDZvNEj1',
    email: 'mrdarcy@mail.com',
    fullName: 'Anastasia',
    isAdmin: true,
  },
  {
    firebaseUserId: 'HTFbqD8emGc2iQlUDF4KXbVUVFl1',
    email: 'bev@mail.com',
    fullName: 'Bev',
    isAdmin: false,
  },
  {
    firebaseUserId: 'wMiDWsRmrqXOagjWkckXEKKL1392',
    email: 'jeff@mail.com',
    fullName: 'Jeff',
    isAdmin: true,
  },
  {
    firebaseUserId: 'VbJ3pOLUWZXiKuDm1mSlN3VImWU2',
    email: 'anna@mail.com',
    fullName: 'Anna',
    isAdmin: true,
  },
  {
    firebaseUserId: 'Slxe6CHIZdeLlp2wxJ2vIczJyh83',
    email: 'leslie@mail.com',
    fullName: 'Leslie',
    isAdmin: false,
  },
  {
    firebaseUserId: 'O3Y4mpDWvCPa35BkKuLI3XUT70h1',
    email: 'al@mail.com',
    fullName: 'Al',
    isAdmin: false,
  },
  {
    firebaseUserId: 'T4zqx9jdRLM03WCj4CNGpU0lLdY2',
    email: 'mike@mike.com',
    fullName: 'Mike',
    isAdmin: false,
  },
  {
    firebaseUserId: 'Ux6QefaKtoWAcbI1Xym4CJcct622',
    email: 'mac@mail.com',
    fullName: 'Mac',
    isAdmin: false,
  },
  {
    firebaseUserId: 'aEDdrAaWIlYlrlUTfuX3axdTXjG2',
    email: 'betty@mail.com',
    fullName: 'Betty',
    isAdmin: false,
  },
  {
    firebaseUserId: 'dhyioySa2IS3xthqpzxvrinJQ4K3',
    email: 'alalal@mail.com',
    fullName: 'Ali',
    isAdmin: true,
  },
];

const photo = [
  {
    firebasePhotoId: 'photo1',
    firebaseUrl: 'https://i.postimg.cc/1XfLsmwS/IMG-8230.jpg',
  },
  {
    firebasePhotoId: 'photo2',
    firebaseUrl: 'https://i.postimg.cc/kgmqFSWt/IMG-8231.jpg',
  },
  {
    firebasePhotoId: 'photo3',
    firebaseUrl: 'https://i.postimg.cc/bw986vRV/IMG-8232.jpg',
  },
  {
    firebasePhotoId: 'photo4',
    firebaseUrl: 'https://i.postimg.cc/gJnWkHb1/IMG-8233.jpg',
  },
  {
    firebasePhotoId: 'photo5',
    firebaseUrl: 'https://i.postimg.cc/xjN2w5Rz/IMG-8234.jpg',
  },
  {
    firebasePhotoId: 'photo6',
    firebaseUrl: 'https://i.postimg.cc/9QCHqhjd/IMG-8235.jpg',
  },
  {
    firebasePhotoId: 'photo7',
    firebaseUrl: 'https://i.postimg.cc/sXBkRfpr/IMG-8236.jpg',
  },
  {
    firebasePhotoId: 'photo8',
    firebaseUrl: 'https://i.postimg.cc/CLCW0Qfz/IMG-8237.jpg',
  },
  {
    firebasePhotoId: 'photo9',
    firebaseUrl: 'https://i.postimg.cc/7LRRXvjQ/IMG-8238.jpg',
  },
  {
    firebasePhotoId: 'photo10',
    firebaseUrl: 'https://i.postimg.cc/xTQ463FY/IMG-8239.jpg',
  },
  {
    firebasePhotoId: 'photo11',
    firebaseUrl: 'https://i.postimg.cc/PfW6v8f7/IMG-8240.jpg',
  },
  {
    firebasePhotoId: 'photo12',
    firebaseUrl:
      'https://i.postimg.cc/6p3zPjVs/769987ab-4441-496d-a2fe-4d720afdf298.jpg',
  },
];

const comment = [
  { content: 'Wow!' },
  { content: 'It is still there' },
  { content: 'OMG someone grab it' },
  { content: 'Nice' },
  { content: 'I want that...' },
  { content: 'GETTING ON THE TRAIN NOW' },
  { content: 'Gone :( ' },
  { content: 'Still here' },
  { content: 'Really good condition' },
  { content: 'Save it for meeee' },
  { content: 'I dunno about this one' },
  { content: 'What a find' },
  { content: 'Cannot believe someone tossed this' },
  { content: 'If only I had the space' },
  { content: 'LOVE' },
  { content: ':) :) :) ' },
  { content: 'Save it!' },
  { content: 'I am going to get this. ' },
  { content: 'Not here anymore' },
  { content: 'Still here!' },
  { content: 'Someone grabbed it' },
  { content: 'I GOT IT!!!' },
];
const post = [
  {
    title: 'Leather armchair',
    description: 'In perfect condition. Very heavy.',
    latitude: 40.750438793927245,
    longitude: -74.00400582700968,
  },
  {
    title: 'Kitchen Island Cart',
    description: 'Few water marks and stains but definitely has life left.',
    latitude: 40.75502217157168,
    longitude: -73.99347983300686,
  },
  {
    title: 'Zebra chair',
    description: 'Funky fun chair! Nice condition. My kid wanted to take it!',
    latitude: 40.751343151025615,
    longitude: -74.00289693630044,
  },
  {
    title: 'Dollhouse',
    description: 'Fair condition. No furniture.',
    latitude: 40.676982200396665,
    longitude: -73.99704448878765,
  },
  {
    title: 'Couch',
    description: 'Sand color. Fair condition. Could use more fluff in pillows.',
    latitude: 40.67576854834818,
    longitude: -73.9985528960824,
  },
  {
    title: 'Shoe racks',
    description: 'Two of them. Good condition.',
    latitude: 40.762466756444034,
    longitude: -73.99777136743069,
  },
  {
    title: 'Painting',
    description: 'Beautiful original oil painting. Give it a home!',
    latitude: 40.80127053386342,
    longitude: -73.95390551537275,
  },
  {
    title: 'Wine cooler',
    description: 'Sign on it says it works!',
    latitude: 40.751343151025615,
    longitude: -73.99586733430624,
  },
  {
    title: 'Folding desk',
    description: 'Gorgeous condition desk. Top folds down. ',
    latitude: 40.804216803789636,
    longitude: -73.9552878588438,
  },
  {
    title: 'Armoire',
    description:
      'Doors slightly warped but solid wood. Would need help to move.',
    latitude: 40.755545610480425,
    longitude: -73.9929973706603,
  },
  {
    title: 'Two desks and a chair',
    description: 'Black desk and white desk. Both useable. Chair is wobbly.',
    latitude: 40.751343151025615,
    longitude: -74.00289693630044,
  },
  {
    title: 'Cabinet with Shelving',
    description: 'Seems to be in good condition. Already taped to move.',
    latitude: 40.67795325868897,
    longitude: -73.99851635098457,
  },
];

const tag = [
  {
    name: 'desk',
  },
  {
    name: 'chair',
  },
  {
    name: 'dollhouse',
  },
  {
    name: 'toy',
  },
  {
    name: 'zebra',
  },
  {
    name: 'shelves',
  },
  {
    name: 'armoire',
  },
  {
    name: 'dresser',
  },
  {
    name: 'fair',
  },
  {
    name: 'good',
  },
  {
    name: 'excellent',
  },
  {
    name: 'painting',
  },
  {
    name: 'art',
  },
  {
    name: 'original',
  },
  {
    name: 'wine',
  },
];
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
  await models.User.bulkCreate(users);
  await models.Photo.bulkCreate(photo);
  await models.Post.bulkCreate(post);
  await models.Comment.bulkCreate(comment);
  await models.Tag.bulkCreate(tag);
  let dbUsers = await models.User.findAll();
  let dbComments = await models.Comment.findAll();
  let photo1 = await models.Photo.findOne({
    where: {
      firebasePhotoId: 'photo1',
    },
  });
  let photo2 = await models.Photo.findOne({
    where: {
      firebasePhotoId: 'photo2',
    },
  });
  let photo3 = await models.Photo.findOne({
    where: {
      firebasePhotoId: 'photo3',
    },
  });
  let photo4 = await models.Photo.findOne({
    where: {
      firebasePhotoId: 'photo4',
    },
  });
  let photo5 = await models.Photo.findOne({
    where: {
      firebasePhotoId: 'photo5',
    },
  });
  let photo6 = await models.Photo.findOne({
    where: {
      firebasePhotoId: 'photo6',
    },
  });
  let photo7 = await models.Photo.findOne({
    where: {
      firebasePhotoId: 'photo7',
    },
  });
  let photo8 = await models.Photo.findOne({
    where: {
      firebasePhotoId: 'photo8',
    },
  });
  let photo9 = await models.Photo.findOne({
    where: {
      firebasePhotoId: 'photo9',
    },
  });
  let photo10 = await models.Photo.findOne({
    where: {
      firebasePhotoId: 'photo10',
    },
  });
  let photo11 = await models.Photo.findOne({
    where: {
      firebasePhotoId: 'photo11',
    },
  });
  let photo12 = await models.Photo.findOne({
    where: {
      firebasePhotoId: 'photo12',
    },
  });
  let post1 = await models.Post.findOne({
    where: {
      title: 'Leather armchair',
    },
  });
  let post2 = await models.Post.findOne({
    where: {
      title: 'Kitchen Island Cart',
    },
  });
  let post3 = await models.Post.findOne({
    where: {
      title: 'Zebra chair',
    },
  });

  let post4 = await models.Post.findOne({
    where: {
      title: 'Dollhouse',
    },
  });
  let post5 = await models.Post.findOne({
    where: {
      title: 'Couch',
    },
  });
  let post6 = await models.Post.findOne({
    where: {
      title: 'Shoe racks',
    },
  });
  let post7 = await models.Post.findOne({
    where: {
      title: 'Painting',
    },
  });
  let post8 = await models.Post.findOne({
    where: {
      title: 'Wine cooler',
    },
  });
  let post9 = await models.Post.findOne({
    where: {
      title: 'Folding desk',
    },
  });
  let post10 = await models.Post.findOne({
    where: {
      title: 'Armoire',
    },
  });
  let post11 = await models.Post.findOne({
    where: {
      title: 'Two desks and a chair',
    },
  });
  let post12 = await models.Post.findOne({
    where: {
      title: 'Cabinet with Shelving',
    },
  });

  let tag0 = await models.Tag.findOne({
    where: {
      name: 'desk',
    },
  });
  let tag1 = await models.Tag.findOne({
    where: {
      name: 'chair',
    },
  });
  let tag2 = await models.Tag.findOne({
    where: {
      name: 'dollhouse',
    },
  });
  let tag3 = await models.Tag.findOne({
    where: {
      name: 'toy',
    },
  });
  let tag4 = await models.Tag.findOne({
    where: {
      name: 'zebra',
    },
  });
  let tag5 = await models.Tag.findOne({
    where: {
      name: 'shelves',
    },
  });
  let tag6 = await models.Tag.findOne({
    where: {
      name: 'armoire',
    },
  });
  let tag7 = await models.Tag.findOne({
    where: {
      name: 'dresser',
    },
  });
  let tag8 = await models.Tag.findOne({
    where: {
      name: 'fair',
    },
  });
  let tag9 = await models.Tag.findOne({
    where: {
      name: 'good',
    },
  });
  let tag10 = await models.Tag.findOne({
    where: {
      name: 'excellent',
    },
  });
  let tag11 = await models.Tag.findOne({
    where: {
      name: 'painting',
    },
  });
  let tag12 = await models.Tag.findOne({
    where: {
      name: 'art',
    },
  });
  let tag13 = await models.Tag.findOne({
    where: {
      name: 'original',
    },
  });
  let tag14 = await models.Tag.findOne({
    where: {
      name: 'wine',
    },
  });

  await dbUsers[0].addPost(post1);
  await dbUsers[1].addPost(post2);
  await dbUsers[2].addPost(post3);
  await dbUsers[3].addPost(post4);
  await dbUsers[4].addPost(post5);
  await dbUsers[5].addPost(post6);
  await dbUsers[6].addPost(post7);
  await dbUsers[7].addPost(post8);
  await dbUsers[8].addPost(post9);
  await dbUsers[9].addPost(post10);
  await dbUsers[0].addPost(post11);
  await dbUsers[1].addPost(post12);

  await dbUsers[0].addPhoto(photo1);
  await dbUsers[1].addPhoto(photo2);
  await dbUsers[2].addPhoto(photo3);
  await dbUsers[3].addPhoto(photo4);
  await dbUsers[4].addPhoto(photo5);
  await dbUsers[5].addPhoto(photo6);
  await dbUsers[6].addPhoto(photo7);
  await dbUsers[7].addPhoto(photo8);
  await dbUsers[8].addPhoto(photo9);
  await dbUsers[9].addPhoto(photo10);
  await dbUsers[0].addPhoto(photo11);
  await dbUsers[1].addPhoto(photo12);

  await post1.addPhoto(photo1);
  await post2.addPhoto(photo2);
  await post3.addPhoto(photo3);
  await post4.addPhoto(photo4);
  await post5.addPhoto(photo5);
  await post6.addPhoto(photo6);
  await post7.addPhoto(photo7);
  await post8.addPhoto(photo8);
  await post9.addPhoto(photo9);
  await post10.addPhoto(photo10);
  await post11.addPhoto(photo11);
  await post12.addPhoto(photo12);

  await post1.addTags([tag1, tag10]);
  await post2.addTags([tag8, tag5]);
  await post3.addTags([tag1, tag4, tag9]);
  await post4.addTags([tag2, tag3]);
  await post5.addTags([tag9]);
  await post6.addTags([tag5, tag8]);
  await post7.addTags([tag11, tag12, tag13]);
  await post8.addTags([tag14]);
  await post9.addTags([tag10, tag0]);
  await post10.addTags([tag6, tag7, tag9]);
  await post11.addTags([tag0, tag1, tag8]);
  await post12.addTags([tag5, tag9]);

  await dbUsers[0].addComments([dbComments[0], dbComments[10], dbComments[20]]);
  await dbUsers[1].addComments([dbComments[1], dbComments[11], dbComments[21]]);
  await dbUsers[2].addComments([dbComments[2], dbComments[12]]);
  await dbUsers[3].addComments([dbComments[3], dbComments[13]]);
  await dbUsers[4].addComments([dbComments[4], dbComments[14]]);
  await dbUsers[5].addComments([dbComments[5], dbComments[15]]);
  await dbUsers[6].addComments([dbComments[6], dbComments[16]]);
  await dbUsers[7].addComments([dbComments[7], dbComments[17]]);
  await dbUsers[8].addComments([dbComments[8], dbComments[18]]);
  await dbUsers[9].addComments([dbComments[9], dbComments[19]]);

  await post1.addComments([dbComments[0], dbComments[1], dbComments[2]]);
  await post2.addComments([dbComments[17], dbComments[18]]);
  await post3.addComments([dbComments[15], dbComments[16]]);
  await post4.addComments([dbComments[14], dbComments[21]]);
  await post5.addComments([dbComments[19]]);
  await post7.addComments([dbComments[10]]);
  await post8.addComments([dbComments[11], dbComments[12], dbComments[13]]);
  await post9.addComments([
    dbComments[3],
    dbComments[4],
    dbComments[5],
    dbComments[6],
  ]);
  await post10.addComments([dbComments[20]]);
  await post12.addComments([dbComments[7], dbComments[8], dbComments[9]]);

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
