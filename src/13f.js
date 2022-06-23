const { FILERS } = require("./constants");
const { filerExists, insertNewFiler, getLastQuarterById, updateById, resetDb } = require("./utils/db");
const { generateTweet } = require("./utils/twit");
const { findHoldingsDiff, getLatestQuarter } = require("./utils/ww")

const parseHoldings = async (filerId, newQ) => {
  const data = await findHoldingsDiff(filerId, newQ - 1, newQ);
  if (data.errors) {
    throw data.errors[0];
  }
  const records = data.records

  // criteria: > 10% change in stock position and > 1% old/new position
  const applicableRecords = []

  for (record of records) {
    change = Math.abs(record.change_in_shares);
    pChange = change / record.quarter_one_shares;
    if (pChange >= 0.05
      && (record.quarter_one_percent_of_portfolio >= 1 || record.quarter_two_percent_of_portfolio >= 1)
      ) {
        applicableRecords.push(record);
    }
  }

  return applicableRecords
}

const getTweetsFromFilers = async () => {
  let {id: quarterId, filing_period: filingPeriod } = await getLatestQuarter();

  const year = filingPeriod.slice(-4);
  const month = parseInt(filingPeriod.slice(0, 2));
  const q = month / 3

  const formattedPeriod = `Q${q} ${year}`

  for (filer in FILERS) {
    filerId = FILERS[filer];

    // check if we should parse holdings
    if (filerExists(filerId)) {
      const lastQuarter = await getLastQuarterById(filerId);
      if (!lastQuarter || quarterId <= lastQuarter) {
        console.log(`Holdings already processed for ${filer} in quarter ${quarterId}`)
        continue;
      }
    } else {
      await insertNewFiler(filerId, filer, quarterId - 1);
    }

    let holdings;
    try {
      holdings = await parseHoldings(filerId, quarterId);
    } catch {
      console.log(`Couldn't fetch holdings for ${filer} in quarter ${quarterId}`);
      continue;
    }
    
    console.log(`Generating ${holdings.length} tweets for ${filer} in quarter ${quarterId}`)
    for (holding of holdings) {
      const tweet = generateTweet(filer, holding, formattedPeriod);
      console.log(tweet);
      // TODO: MAKE TWEET
    }

    // update db
    updateById(filerId, quarterId);
  }
}

const test = async() => {
  resetDb();
  getTweetsFromFilers();
}

module.exports = {parseHoldings, getTweetsFromFilers}