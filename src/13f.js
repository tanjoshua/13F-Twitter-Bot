const { makeApiCall } = require("./utils.js/ww");

const findQuarters = async () => {
  const args = {
    command: "quarters"
  }

  try {
    const response = await makeApiCall(args);
    console.log(response.data);
  } catch (error) {
    console.log(error)
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
    console.log(response.data)
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
    console.log(response.data)
  } catch (error) {
    console.log(error);
  }

}

module.exports = { findQuarters, findHoldings, findHoldingsDiff }