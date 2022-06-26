const { Pool, Client } = require('pg')
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const insertNewFiler = async (id, name, quarter) => {
    return pool.query('INSERT INTO filer VALUES ($1, $2, $3)', [id, name, quarter])
}

const filerExists = async (id) => {
    const res = await pool.query('SELECT * FROM filer WHERE id=$1', [id])
    return !!res.rowCount
}

const getLastQuarterById = async (id) => {
    const res = await pool.query('SELECT last_quarter FROM filer WHERE id=$1', [id])
    return res.rows[0].last_quarter;
}

const updateById = async (id, newQuarter) => {
    const res = await pool.query('UPDATE filer SET last_quarter=$1 WHERE id=$2', [newQuarter, id])
}

const resetDb = async () => {
    await pool.query('DELETE from filer');
}

const getTweetBacklog = async () => {
    const res = await pool.query('SELECT id, tweet FROM backlog')
    return res.rows;
}

const addToBacklog = async (tweet) => {
    await pool.query('INSERT INTO backlog (tweet) VALUES ($1)', [tweet]);  
}

const removeFromBacklogById = async (id) => {
    await pool.query('DELETE FROM backlog WHERE id=$1', [id])
}

module.exports = {pool, insertNewFiler, getLastQuarterById, updateById, filerExists, resetDb, getTweetBacklog, removeFromBacklogById, addToBacklog}
