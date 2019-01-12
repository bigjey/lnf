'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
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
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6],
          notEmpty: true
        }
      }
    },
    {
      tableName: 'user'
    }
  );

  User.associate = ({ Post }) => {
    User.hasMany(Post, {
      foreignKey: 'userId'
    });
  };

  User.beforeCreate(async (user, options) => {
    try {
      const hashed = await bcrypt.hash(user.password, 10);

      user.password = hashed;
    } catch (err) {
      throw err;
    }
  });

  User.prototype.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
