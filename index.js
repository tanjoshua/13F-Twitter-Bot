const { getTweetsFromFilers } = require("./src/13f");
const { resetDb } = require("./src/utils/db");
const { tweetBacklog, twitClient } = require("./src/utils/twit");

const CronJob = require('cron').CronJob;

const job = new CronJob('*/10 * * * *', async () => {
    console.log(new Date().toLocaleString())
    await getTweetsFromFilers();
})

const tweetBacklogJob = new CronJob('*/15 * * * *', async () => {
    if (tweetBacklog.length > 0) {
        console.log(`${tweetBacklog.length} tweets in backlog, tweeting now`);
        const count = tweetBacklog.length;
        for (let i = 0; i < count; i++) {
            const tweet = tweetBacklog.shift()
            twitClient.post('statuses/update', { status: tweet }, (err, data, response) => {
                if (err) {
                    console.log("Failed to tweet, pushing to backlog");
                    tweetBacklog.push(tweet);
                } else {
                    console.log(`TWEETED: ${data.text}`)
                }
            })
        }
    } else {
        console.log('No tweets in backlog');
    }
})

resetDb();
// job.start();
// tweetBacklogJob.start();