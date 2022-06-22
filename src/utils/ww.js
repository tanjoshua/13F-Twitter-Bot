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

const getLatestQuarter = async () => {
  const data = await findQuarters();
  lastObject = data.quarters[data.quarters.length - 1];
  return lastObject;
}

const findQuarters = async () => {
  const args = {
    command: "quarters"
  }

  try {
    const response = await makeApiCall(args);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const findHoldings = async (filerId, quarter) => {
  const args = {
    command: "holdings",
    filer_ids: [filerId],
    quarter_ids: [quarter],
    limit: 1,
  }

  try {
    const response = await makeApiCall(args);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const findHoldingsDiff = async (filerId, q1id, q2id) => {
  const args = {
    command: "holdings_comparison",
    filerid: filerId,
    q1id: q1id,
    q2id: q2id,
  }

  try {
    const response = await makeApiCall(args);
    return response.data
  } catch (error) {
    console.log(error);
  }
}



module.exports = {makeApiCall, findQuarters, findHoldings, findHoldingsDiff, getLatestQuarter}