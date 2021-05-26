const db = require('./db');

const User = require('./models/user');
const Comment = require('./models/comment');
const Photo = require('./models/photo');
const Post = require('./models/post');
const Tag = require('./models/tag');

User.belongsToMany(Post, { through: 'userPost' });
Post.belongsToMany(User, { through: 'userPost' });

Post.hasMany(Comment);
Comment.belongsTo(Post);

Comment.belongsTo(User);
User.hasMany(Comment);

Post.belongsToMany(Tag, { through: 'postTag' });
Tag.belongsToMany(Post, { through: 'postTag' });

Photo.belongsTo(Post);
Post.hasMany(Photo);

Photo.belongsTo(User);
User.hasMany(Photo);

module.exports = {
  db,
  models: {
    User,
    Comment,
    Photo,
    Post,
    Tag,
  },
};
