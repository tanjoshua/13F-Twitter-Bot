require('dotenv').config();
const axios = require('axios').default;
const hmacsha1 = require('hmacsha1');

const args = {
    command: "quarters"
}


const makeApiCall = async (args) => {
    const stringifiedArgs = JSON.stringify(args);
    const encodedArgs = encodeURIComponent(stringifiedArgs);


    let timestamp = "2022-06-20T01:03:34Z"
    timestamp = new Date().toISOString();


    const rawArgs = stringifiedArgs + '\n' + timestamp;
    const sig = hmacsha1(process.env.WW_SECRET_KEY, rawArgs);


    try {
        url_base = 'https://whalewisdom.com/shell/command.json?'
        url_args = 'args=' + encodedArgs
        url_end = '&api_shared_key=' + process.env.WW_SHARED_KEY + '&api_sig=' + sig + '&timestamp=' + timestamp
        url = url_base + url_args + url_end
        const response = await axios.get(url)
        console.log(response.data)
    } catch (error) {
        console.log(error.response.data);

    }

}

makeApiCall(args);
