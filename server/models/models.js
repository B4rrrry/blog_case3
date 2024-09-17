const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Comments = sequelize.define(
  "comments",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: {type: DataTypes.STRING, allowNull: false}
    //users_id
    //posts_id
  }
);

const Users = sequelize.define(
  "users",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    f_name: { type: DataTypes.STRING, allowNull: false },
    s_name: { type: DataTypes.STRING, allowNull: false },
    l_name: { type: DataTypes.STRING, allowNull: false },
  }
);

const Posts = sequelize.define(
  "posts",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    preview: { type: DataTypes.STRING, allowNull: false },
    //users_id
    type: { type: DataTypes.STRING, allowNull: false, defaultValue: "public" }
  }
);

const SubUsers = sequelize.define(
  "sub_users",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    //user_id
  }
);

const Subscription = sequelize.define(
  "subscription",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    //sub_users_id
    //user_id
  }
);

const TagsPosts = sequelize.define(
  "tags_posts",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    //tags_id
    //posts_id
  }
);

const Tags = sequelize.define(
  "tags",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
  }
)

Posts.hasMany(Comments);
Comments.belongsTo(Posts);

Users.hasMany(Comments);
Comments.belongsTo(Users);

Users.hasMany(Posts);
Posts.belongsTo(Users);

Tags.hasMany(TagsPosts);
TagsPosts.belongsTo(Tags);

Posts.hasMany(TagsPosts);
TagsPosts.belongsTo(Posts);

Users.hasOne(SubUsers);
SubUsers.belongsTo(Users);

SubUsers.belongsToMany(Users, { through: Subscription, as: "sub_users_id" });
Users.belongsToMany(SubUsers, { through: Subscription, as: "users_id" });

module.exports = {
  Comments,
  Users,
  Posts,
  SubUsers,
  Subscription,
  TagsPosts,
  Tags
}