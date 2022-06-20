require('dotenv').config();
const twit = require('twit');

const twitClient = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

const postTweet = (body) => {
    twitClient.post('statuses/update', { status: body }, function(err, data, response) {
        if (err) {
            console.log(err);
        }
        console.log(data.text)

    })
}

module.exports = {twitClient, postTweet}