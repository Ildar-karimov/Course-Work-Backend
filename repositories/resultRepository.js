const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT "result_id", "result_author", "result_mark" 
                FROM "result" 
                ORDER BY "result_id"`,
    select: `SELECT "result_id", "result_author", "result_mark" 
            FROM "result" 
            WHERE "result_id" = $1`,
    insert: `INSERT INTO "result"("test_id","result_author", "result_mark") 
            VALUES ($1, $2, $3) 
            RETURNING "result_id","test_id", "result_author", "result_mark"`,
    update: `UPDATE "result" 
            SET "result_author" = $1, "result_mark" = $2 
            WHERE "result_id" = $3 
            RETURNING "result_id", "result_author", "result_mark"`,
    delete: `DELETE FROM "result" 
            WHERE "result_id" = $1 
            RETURNING "result_id", "result_author", "result_mark"`,
    getByTestId:`SELECT * FROM "result"
                    WHERE test_id = $1`
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

async function getByTestId(id) {
    const query = await pool.query(
        queryStrings.getByTestId,
        [id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows;
}

async function post(result) {
    const query = await pool.query(
        queryStrings.insert,
        [result.test_id, result.result_author, result.result_mark]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, result) {
    const query = await pool.query(
        queryStrings.update,
        [result.result_author, result.result_mark, id]);
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

module.exports = { getAll, get, post, put, remove,getByTestId }