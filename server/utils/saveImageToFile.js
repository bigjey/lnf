const fs = require('fs');
const path = require('path');

const UPLOADS_FOLDER = path.join(__dirname, '..', 'uploads');
const BASE64_HEADER = /data\:image\/(jpg|jpeg|png)\;base64/;

if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER);
}

const randomFileName = () => {
  return Math.random().toString().slice(2, 16);
}

const saveImageToFile = async (image) => {
  [, fileType] = image.match(BASE64_HEADER);

  if (!fileType) {
    throw new Error('wrong image data');
  }

  const base64 = image.replace(BASE64_HEADER, '');
  const fileName = `${randomFileName()}.${fileType}`;
  const filePath = path.join(UPLOADS_FOLDER, fileName);

  try {
    fs.writeFileSync(filePath, base64, 'base64');
    return fileName;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  saveImageToFile,
  UPLOADS_FOLDER
}