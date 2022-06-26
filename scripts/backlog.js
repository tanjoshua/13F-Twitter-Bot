const { clearBacklog } = require("../backlog");
const { pool } = require("../src/utils/pg");

const run = async () => {
    await clearBacklog();
}

run();