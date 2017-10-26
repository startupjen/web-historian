var CronJob = require('cron').CronJob;
new CronJob('0 * * * * *', function() {
  console.log('You will see this message every minute ', new Date());
}, null, true, 'America/Los_Angeles');

//637