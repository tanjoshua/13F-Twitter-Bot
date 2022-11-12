require('dotenv').config();
const twit = require('twit');
const { HANDLES } = require('../constants');

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

    // get twitter handle or name
    const handle = HANDLES[filer]

    let text = `${filer} (${handle}) ${action} ${absChange.toLocaleString()} shares (${changeText}) of ${data.stock_name} in ${period}. `;
    
    // portfolio % information
    let percentText;
    if (action == "bought") {
        const percent = data.quarter_two_percent_of_portfolio
        percentText = `$${data.symbol} is now ${percent.toFixed(2)}% of the portfolio.`
    } else {
        const percent = data.quarter_one_percent_of_portfolio
        percentText = `$${data.symbol} was previously ${percent.toFixed(2)}% of the portfolio.`
    }

    text += percentText

    return text;
}


module.exports = {twitClient, generateTweet}