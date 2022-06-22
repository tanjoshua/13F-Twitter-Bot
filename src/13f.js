const { FILERS } = require("./constants");
const { generateTweet } = require("./utils/twit");
const { findHoldingsDiff, getLatestQuarter } = require("./utils/ww")

const parseHoldings = async (filerId, newQ) => {
  const data = await findHoldingsDiff(filerId, newQ - 1, newQ);
  const records = data.records

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

const getTweetsFromFilers = async () => {
  const {id: quarterId, filing_period: filingPeriod } = await getLatestQuarter();

  const year = filingPeriod.slice(-4);
  const month = parseInt(filingPeriod.slice(0, 2));
  const q = month / 3

  const formattedPeriod = `Q${q} ${year}`

  for (filer in FILERS) {
    filerId = FILERS[filer];

    // check if we should parse holdings
    


    holdings = await parseHoldings(filerId, quarterId);
    for (holding of holdings) {
      console.log(generateTweet(filer, holding, formattedPeriod));
    }
  }
}

const test = async() => {
    getTweetsFromFilers();
}
test();

module.exports = {parseHoldings}