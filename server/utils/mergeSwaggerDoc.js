const fs = require('fs');
const glob = require('glob');
const yaml = require('js-yaml');
const merge = require('lodash.merge');

let doc = {};

try {
  const files = glob.sync('./api/**/*swagger.yaml', { nosort: true });

  for (const file of files) {
    const json = yaml.safeLoad(fs.readFileSync(file));

    merge(doc, json);
  }
} catch (err) {
  throw err;
}

module.exports = doc;
