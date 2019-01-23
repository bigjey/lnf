'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: null
      },
      breed: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      gender: {
        type: DataTypes.ENUM('MALE', 'FEMALE'),
        defaultValue: null
      },
      image: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
          as: 'userId'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    },
    {
      tableName: 'post'
    }
  );

  Post.associate = ({ User }) => {
    Post.belongsTo(User, {
      foreignKey: 'userId'
    });
  };

  return Post;
};
