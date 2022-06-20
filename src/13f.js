const { FILERS } = require("./constants");
const { generateTweet } = require("./utils/twit");
const { findHoldingsDiff } = require("./utils/ww")

const parseHoldings = async (filerId, newQ) => {
  const { records } = await findHoldingsDiff(filerId, newQ - 1, newQ)

  // criteria: > 10% change in stock position and > 0.5% old/new position
  const applicableRecords = []

  for (record of records) {
    change = Math.abs(record.change_in_shares);
    pChange = change / record.quarter_one_shares;
    if (pChange >= 0.10 && 
        (record.quarter_one_percent_of_portfolio >= 0.5 || record.quarter_two_percent_of_portfolio >= 0.5)) {
        applicableRecords.push(record);
    }
  }

  return applicableRecords
}

const test = async() => {
    const records = await parseHoldings(FILERS["BERKSHIRE HATHAWAY INC"], 85);
    console.log(records);
    for (record of records) {
        console.log(generateTweet("BERKSHIRE HATHAWAY INC", record));
    }
}
test();

module.exports = {parseHoldings}