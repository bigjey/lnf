'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    try {
      await queryInterface.addColumn('post', 'lat', {
        type: DataTypes.FLOAT,
        defaultValue: null,
      });

      await queryInterface.addColumn('post', 'lng', {
        type: DataTypes.FLOAT,
        defaultValue: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  down: async (queryInterface, DataTypes) => {
    try {
      await queryInterface.removeColumn('post', 'lat');
      await queryInterface.removeColumn('post', 'lng');
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
