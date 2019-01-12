'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('post', {
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
    });
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('post');
  }
};
