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

    } else {
      const filePath = archive.paths.archivedSites + '\\' + req.url;
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) { 
          res.statusCode = 404;
          res.end();
        }
        console.log('data is ', data);
        res.end(data);
      });

    }
  } else if (req.method === 'POST') {
    res.statusCode = 302;
    req.setEncoding = 'utf8';
    let body = '';

    req
      .on('data', (data) => { body += data; })
      .on('end', () => {

        body = body.split('=')[1];
        console.log('POST - body is ', body);
        
        fs.appendFile(archive.paths.list, body + '\n', 'utf8', (err) => {
          if (err) { console.log('err is ', err); }
          res.end();
        });
      });
  }
};
