const twit = require("./twit");

exports.postTweet = (body) => {
    twit.post('statuses/update', { status: body }, function(err, data, response) {
        if (err) {
            console.log(err);
        }
        console.log(data.text)

    })
}
