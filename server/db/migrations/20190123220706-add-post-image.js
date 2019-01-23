'use strict';

const fs = require('fs');
const path = require('path');
const { UPLOADS_FOLDER } = require('../../utils/saveImageToFile');
const db = require('../');

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn('post', 'image', {
      type: DataTypes.STRING
    })
  },

  down: async (queryInterface, DataTypes) => {
    try {
      await db.connect();
      const imagesToDelete = await db.Post.findAll({
        attributes: ['image'],
        raw: true
      })
      for (let { image } of imagesToDelete) {
        if (!image) continue;

        const filePath = path.join(UPLOADS_FOLDER, image);
        fs.existsSync(filePath) && fs.unlinkSync(filePath);
      }
      await queryInterface.removeColumn('post', 'image');
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
