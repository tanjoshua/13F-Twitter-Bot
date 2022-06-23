const { getTweetsFromFilers } = require("./src/13f");
const { FILERS } = require("./src/constants");
const { resetDb } = require("./src/utils/db");
const {findHoldingsDiff, findQuarters} = require("./src/utils/ww");

const CronJob = require('cron').CronJob;

const job = new CronJob('* * * * *', async () => {
    console.log(new Date().toLocaleString())
    await getTweetsFromFilers();
})

resetDb();
job.start();