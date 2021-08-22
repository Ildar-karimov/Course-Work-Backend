const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT q.*, t.*, "question_test_id","block" 
                FROM "question_test" 
                JOIN question q on question_test.question_id = q.question_id
                JOIN test t on question_test.test_id = t.test_id`,
    select: `SELECT "question_test_id","question_id", "test_id","block" 
            FROM "question_test" 
            WHERE "question_test_id" = $1`,
    insert: `INSERT INTO "question_test"("question_id", "test_id","block") 
            VALUES ($1, $2, $3) 
            RETURNING "question_test_id", "question_id", "test_id", "block"`, 
    update: `UPDATE "question_test" 
            SET "question_id" = $1, "test_id" = $2 
            WHERE "question_test_id" = $3 
            RETURNING "question_test_id", "question_id", "test_id"`,
    delete: `DELETE FROM "question_test" 
            WHERE "question_test_id" = $1 
            RETURNING "question_test_id", "question_id", "test_id"`,
    getByTestId: `SELECT q.*, "block"
                    FROM question_test
                    JOIN question q on question_test.question_id = q.question_id
                    WHERE question_test.test_id = $1 
                    ORDER BY block`
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

async function post(question_test) {
    const query = await pool.query(
        queryStrings.insert,
        [question_test.question_id, question_test.test_id, question_test.block]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, question_test) {
    const query = await pool.query(
        queryStrings.update,
        [question_test.question_id, question_test.test_id, id]);
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

module.exports = { getAll, get, post, put, remove, getByTestId }