var path = require('path');
var archive = require('../helpers/archive-helpers');
const fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {
    res.statusCode = 200;
    
    if (req.url === '/') {
      const indexPath = `${archive.paths.siteAssets}\\index.html`;
      fs.readFile(indexPath, 'utf8', (err, data) => { res.end(data); });

    } else if (req.url === '/styles.css') {
      const cssPath = `${archive.paths.siteAssets}\\styles.css`;      
      fs.readFile(cssPath, 'utf8', (err, data) => { res.end(data); });
    } 
  } else if (req.method === 'POST') {
    res.statusCode = 302;
    req.setEncoding = 'utf8';
    let url = '';

    req
      .on('data', (data) => { url += data; })
      .on('end', () => {

        url = url.split('=')[1];
        console.log('POST - url is ', url);

        archive.isUrlArchived(url, (isArchived) => {
          console.log('isArchived is ', isArchived)
          if (isArchived) {
            const filePath = archive.paths.archivedSites + '\\' + url;
            fs.readFile(filePath, 'utf8', (err, data) => {
              res.end(data);
            })
          } else {
            fs.appendFile(archive.paths.list, url + '\n', 'utf8', (err) => {
              if (err) { console.log('err is ', err); }
              const loadingPath = `${archive.paths.siteAssets}\\loading.html`;
              fs.readFile(loadingPath, 'utf8', (err, data) => { 
                console.log('loading data is ', data)
                res.statusCode = 303
                res.end(data);
              });
            });
          }
        })
      });
  }
};
