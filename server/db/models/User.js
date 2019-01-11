'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
        isEmail: true,
        notEmpty: true
      }
    }
  });

  User.beforeCreate((user, options) => {
    return hashPassword(user.password).then((hashedPw) => {
      user.password = hashedPw;
    });
  });

  User.prototype.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
