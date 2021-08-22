const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT "test_id","test_author", "test_name", "test_type", "test_difficult"  
                FROM "test" 
                ORDER BY "test_id"`,
    select: `SELECT "test_id", "test_author", "test_name", "test_type", "test_difficult" 
            FROM "test" 
            WHERE "test_id" = $1`,
    insert: `INSERT INTO "test"("test_author", "test_name", "test_type", "test_difficult" ) 
            VALUES ($1, $2, $3, $4) 
            RETURNING "test_id", "test_author", "test_name", "test_type", "test_difficult"`,
    update: `UPDATE "test" 
            SET "test_author" = $1, "test_name" = $2, "test_type" = $3, "test_difficult" = $4 
            WHERE "test_id" = $5 
            RETURNING "test_id", "test_author", "test_name", "test_type", "test_difficult"`,
    delete: `DELETE FROM "test" 
            WHERE "test_id" = $1 
            RETURNING "test_id", "test_author", "test_name", "test_type", "test_difficult" `
}

async function getAll() {
    const query = await pool.query(queryStrings.selectAll);
    return query.rows;
}

async function get(id) {
    const query = await pool.query(
        queryStrings.select,
        [id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function post(test) {
    const query = await pool.query(
        queryStrings.insert,
        [test.test_author, test.test_name, test.test_type, test.test_difficult]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, test) {
    const query = await pool.query(
        queryStrings.update,
        [test.test_author, test.test_name, test.test_type, test.test_difficult, id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function remove(id) {
    const query = await pool.query(
        queryStrings.delete,
        [id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

module.exports = { getAll, get, post, put, remove }