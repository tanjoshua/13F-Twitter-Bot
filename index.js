const { clearBacklog } = require("./backlog");
const { getTweetsFromFilers } = require("./src/13f");
const { FILERS } = require("./src/constants");
const { filerExists, insertNewFiler, updateById, getLastQuarterById, pool } = require("./src/utils/pg");
const { findHoldingsDiff, findHoldings, hasFiled } = require("./src/utils/ww");
const {parseHoldings} = require("./src/13f")
const {generateTweet} = require("./src/utils/twit")

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


const test = async () => {
    const filer = "APPALOOSA LP"
    const quarter = 85
    holdings = await parseHoldings(FILERS[filer], quarter);
    for (holding of holdings) {
      const tweet = generateTweet(filer, holding, "TEST Q");
      console.log(tweet)
    }
}
