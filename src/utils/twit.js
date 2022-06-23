require('dotenv').config();
const twit = require('twit');

const twitClient = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

const generateTweet = (filer, data, period) => {
    const action = data.change_in_shares > 0 ? "bought" : "sold";
    const sign = data.change_in_shares > 0 ? "+" : "-";
    const absChange = Math.abs(data.change_in_shares);

    let changeText;
    if (data.quarter_one_shares != 0) {
        pChange = (absChange / data.quarter_one_shares) * 100;
        changeText = `${sign}${pChange.toFixed(2)}%`;
    } else {
        changeText = "New Position";
    }
    const text = `${filer} ${action} ${absChange.toLocaleString()} shares (${changeText}) of ${data.stock_name} in ${period}.\n$${data.symbol}`;
    return text;
}

const tweetBacklog = []

module.exports = {twitClient, generateTweet, tweetBacklog}