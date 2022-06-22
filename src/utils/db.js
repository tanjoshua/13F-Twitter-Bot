const db = require('better-sqlite3')('filers.db', {});

const insertNewFiler = (id, name, quarter) => {
    const insert = db.prepare('INSERT INTO filer VALUES (?, ?, ?)');
    insert.run(id, name, quarter);
}

const filerExists = (id) => {
    const exists = db.prepare('SELECT 1 FROM filer WHERE id=?')
    const result = exists.get(id);
    return !!result;
}

const getLastQuarterById = (id) => {
    const statement = db.prepare('SELECT last_quarter FROM filer WHERE id=?');
    const lastQ = statement.get(id);
    return lastQ?.LAST_QUARTER;
}

const updateById = (id, newQuarter) => {
    const update = db.prepare('UPDATE filer SET last_quarter=? WHERE id=?');
    update.run(newQuarter, id);
}

const resetDb = () => {
    const del = db.prepare('DELETE FROM filer');
    del.run();
}

module.exports = {insertNewFiler, getLastQuarterById, updateById, filerExists, resetDb}
