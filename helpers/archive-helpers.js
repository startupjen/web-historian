var fs = require('fs');
var path = require('path');
var _ = require('underscore');
const request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    const lines = data.split('\n');
    callback(lines);
  });
};

exports.isUrlInList = function(url, callback) {
  let doesUrlExist = false;

  exports.readListOfUrls( (urls) => {
    for (let listedUrl of urls) {
      if (url === listedUrl) { 
        doesUrlExist = true; 
        return callback(doesUrlExist);
      }
    }
    callback(doesUrlExist);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', 'utf8', (err) => {
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.access(exports.paths.archivedSites + '\\' + url, fs.constants.F_OK, (err) => {
    console.log('archive-helpers: is there an err? ', err)
    err ? callback(false) : callback(true);
  });

};

exports.downloadUrls = function(urls) {

  // exports.readListOfUrls((urlList) => {
  //   for (let url of urls) {
  //     if ( !urlList.includes(url) ) {
        request('http://' + urls[0], (err, res, body) => {
          console.log('downloaded url, content is ', body)
          fs.writeFile(exports.paths.archivedSites + '\\' + urls[0], body, 'utf8', (err) => {
            // exports.addUrlToList(url, () => {});
          });
        });
  //     }
  //   }
  // });
};