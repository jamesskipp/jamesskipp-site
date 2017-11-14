const fs = require('fs');
const path = require('path');

const _ = require('lodash');

var getTitle = (fileName, callback) => {
  callback(fileName);
}

var getBody = (fileDir, callback) => {
  console.log('Path: ', fileDir);
  try {
    fs.readFile(fileDir, 'utf8', (err, data) => {
      callback(data);
    });
  } catch (err) {
    console.log(err);
  }
}

var getTitleSync = (fileName) => {
  fileName = _.trimEnd(fileName, '.txt');
  return fileName.replace(/_/g, ' ');
  // return _.replace(fileName, '_', ' ');
}

var getBodySync = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.log(err);
  }
}

var getTimeSync = (filePath) => {
  try {
    var bt = new Date(fs.statSync(filePath).birthtime);
    var et = new Date(fs.statSync(filePath).mtime);
    return {
      birthed: {
        time: bt,
        pretty: `${bt.getMonth()}/${bt.getDate()}/${bt.getFullYear()} ${bt.getHours()}:${bt.getMinutes()}`
      },
      edited: {
        time: et,
        pretty: `${et.getMonth()}/${et.getDate()}/${et.getFullYear()} ${et.getHours()}:${et.getMinutes()}`
      }};
  } catch (err) {
    console.log('Cannot read file.');
    console.log(err);
  }
}

var getNotes = (notesDir, callback) => {
  notesDir = path.normalize(notesDir);

  var notesArray = [];

  try {
    fs.readdir(notesDir, (err, files) => {
      if (err) {
        throw err;
      } else {
        files.forEach((file) => {
          notesArray.push({
            title:  getTitleSync(file),
            body: getBodySync(notesDir + file),
            stats: getTimeSync(notesDir + file)
          });
        });
      }
      console.log(notesArray);
      callback((_.sortBy(notesArray, ['stats.birthed.time'])).reverse());
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports.getNotes = getNotes;
