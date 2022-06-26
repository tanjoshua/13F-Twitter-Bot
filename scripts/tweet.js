const { getTweetsFromFilers } = require("../src/13f");
const { pool } = require("../src/utils/pg");

const run = async () => {
    await getTweetsFromFilers();
}

run();
