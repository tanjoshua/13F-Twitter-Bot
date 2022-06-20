const { FILERS } = require("./src/constants");
const {findHoldingsDiff, findQuarters} = require("./src/utils/ww");

console.log(findHoldingsDiff(FILERS["BERKSHIRE HATHAWAY INC"], 84, 85))
// findHoldingsDiff(FILERS["BERKSHIRE HATHAWAY INC"], 85, 86)