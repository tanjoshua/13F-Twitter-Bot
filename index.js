const twit = require("./twit");

twit.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})