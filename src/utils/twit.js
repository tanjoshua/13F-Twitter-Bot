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

const generateTweet = (filer, data) => {
    const action = data.change_in_shares > 0 ? "bought" : "sold";
    const text = `${filer} ${action} ${Math.abs(data.change_in_shares)} shares of ${data.stock_name} ($${data.symbol})`
    return text;
}

module.exports = {twitClient, postTweet, generateTweet}