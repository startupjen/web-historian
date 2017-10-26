// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

const CronJob = require('cron').CronJob;
const archive = require('../helpers/archive-helpers');

console.log('htmlfetcher cron initialized');

exports.startCron = () => new CronJob('0 * * * * *', function() {
  console.log('htmlfetcher.js running ', new Date());

  archive.readListOfUrls( (urls) => {

    for (let url of urls) {
      archive.isUrlArchived(url, (isUrlArchived)=>{
        console.log('htmlfetcher - isUrlArchived ', isUrlArchived);
        if (!isUrlArchived) {
          archive.downloadUrls([url]);
        }
      });
    }
  });
  //grab the list of urls
  //check that each url exists as a file
  //if it does not
  //download it

}, null, true, 'America/Los_Angeles');