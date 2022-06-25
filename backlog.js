const { getTweetBacklog, removeFromBacklogById } = require("./src/utils/db");
const { twitClient } = require("./src/utils/twit");

const clearBacklog = async () => {
    const tweetBacklog = getTweetBacklog();

    if (tweetBacklog.length > 0) {
        console.log(`${tweetBacklog.length} tweets in backlog, tweeting now`);
        for (data of tweetBacklog) {
            const tweet = data.tweet
            const backlogId = data.id
            
            twitClient.post('statuses/update', { status: tweet }, (err, data, response) => {
                if (err) {
                    console.log("Failed to tweet, leave in backlog");
                } else {
                    removeFromBacklogById(backlogId);
                    console.log(`TWEETED: ${data.text}`)
                }
            })
        }
    } else {
        console.log('No tweets in backlog');
    }
}

module.exports = {clearBacklog}