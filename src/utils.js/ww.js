require('dotenv').config();
const axios = require('axios').default;
const hmacsha1 = require('hmacsha1');

const makeApiCall = async (args) => {
    const stringifiedArgs = JSON.stringify(args);
    const encodedArgs = encodeURIComponent(stringifiedArgs);

    const timestamp = new Date().toISOString();

    const rawArgs = stringifiedArgs + '\n' + timestamp;
    const sig = hmacsha1(process.env.WW_SECRET_KEY, rawArgs);

    url_base = 'https://whalewisdom.com/shell/command.json?'
    url_args = 'args=' + encodedArgs
    url_end = '&api_shared_key=' + process.env.WW_SHARED_KEY + '&api_sig=' + sig + '&timestamp=' + timestamp
    url = url_base + url_args + url_end
    return axios.get(url)
}



module.exports = {makeApiCall}