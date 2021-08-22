const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT "question_id", "question_name", "question_answer", "type_id", "count_correct", "count_all", "ontolog" 
                FROM "question" 
                ORDER BY "question_id"`,
    select: `SELECT "question_id", "question_name", "question_answer", "type_id", "count_correct", "count_all", "ontolog" 
            FROM "question" 
            WHERE "question_id" = $1`,
    insert: `INSERT INTO "question"("question_name", "question_answer", "type_id", "count_correct", "count_all", "ontolog") 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING "question_id", "question_name", "question_answer", "type_id", "count_correct", "count_all", "ontolog"`,
    update: `UPDATE "question" 
            SET "question_name" = $1, "question_answer" = $2, "type_id" = $3, "count_correct" = $4, "count_all" =$5, "ontolog" = $6
            WHERE "question_id" = $7 
            RETURNING "question_id", "question_name", "question_answer", "type_id", "count_correct", "count_all", "ontolog"`,
    delete: `DELETE FROM "question" 
            WHERE "question_id" = $1 
            RETURNING "question_id", "question_name", "question_answer", "type_id", "count_correct", "count_all", "ontolog"`,
    selectByType: `SELECT *
                FROM "question"
                WHERE type_id = $1`,
    updateStat:`UPDATE "question" SET "count_correct"=$1, "count_all"=$2
                WHERE "question_id" =$3
                RETURNING "question_id", "question_name", "question_answer", "type_id", "count_correct", "count_all", "ontolog"`
    
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

async function getByType(id) {
    const query = await pool.query(
        queryStrings.selectByType,
        [id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows;
}

async function post(question) {
    const query = await pool.query(
        queryStrings.insert,
        [question.question_name, question.question_answer, question.type_id, question.count_correct, question.count_all, question.ontolog]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, question) {
    const query = await pool.query(
        queryStrings.update,
        [question.question_name, question.question_answer, question.type_id, question.count_correct, question.count_all, question.ontolog, id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function updateStat(id, question) {
    const query = await pool.query(
        queryStrings.update,
        [question.count_correct, question.count_all, id]);
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

module.exports = { getAll, get, post, put, remove, getByType, updateStat }