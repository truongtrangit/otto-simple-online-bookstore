const fs = require('fs');
const path = require('path');

const fileList = fs.readdirSync(__dirname);
const responseList = [];
for (const file of fileList) {
  if (file === 'index.js') {
    continue;
  }
  const fileName = file.replace('.js', '');
  const responseFunc = require(path.join(__dirname, file));
  responseList.push({
    name: responseFunc.name,
    func: responseFunc,
  });
  console.debug('Loaded Response ' + fileName);
}
module.exports = responseList;
