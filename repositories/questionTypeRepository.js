const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT "question_type_id", "question_id", "type_id"
                FROM "question_type" 
                ORDER BY "question_type_id"`,
    select: `SELECT "question_type_id","question_id", "type_id" 
            FROM "question_type" 
            WHERE "question_type_id" = $1`,
    insert: `INSERT INTO "question_type"("question_id", "type_id") 
            VALUES ($1, $2) 
            RETURNING "question_type_id", "question_id", "type_id"`,
    update: `UPDATE "question_type" 
            SET "question_id" = $1, "type_id" = $2 
            WHERE "question_type_id" = $3 
            RETURNING "question_type_id", "question_id", "type_id"`,
    delete: `DELETE FROM "question_type" 
            WHERE "question_type_id" = $1 
            RETURNING "question_type_id", "question_id", "type_id"`
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

async function post(question_type) {
    const query = await pool.query(
        queryStrings.insert,
        [question_type.question_id, question_type.type_id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, question_type) {
    const query = await pool.query(
        queryStrings.update,
        [question_type.question_id, question_type.type_id, id]);
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