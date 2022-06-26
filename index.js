const { clearBacklog } = require("./backlog");
const { getTweetsFromFilers } = require("./src/13f");
const { filerExists, insertNewFiler, updateById, getLastQuarterById, pool } = require("./src/utils/pg");

const CronJob = require('cron').CronJob;

const job = new CronJob('*/10 * * * *', async () => {
    console.log(new Date().toLocaleString())
    await getTweetsFromFilers();
})

const tweetBacklogJob = new CronJob('*/15 * * * *', async () => {
    await clearBacklog();
})


// job.start();
// tweetBacklogJob.start();

// getTweetsFromFilers();
// clearBacklog();
