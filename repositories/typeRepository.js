const Pool = require('pg').Pool;
const { connection } = require('../config')

const pool = new Pool(connection);
const queryStrings = {
    selectAll: `SELECT "type_id", "type_name"
                FROM "type" 
                ORDER BY "type_id"`,
    select: `SELECT "type_id", "type_name" 
            FROM "type" 
            WHERE "type_id" = $1`,
    insert: `INSERT INTO "type"("type_name") 
            VALUES ($1) 
            RETURNING "type_id", "type_name"`,
    update: `UPDATE "type" 
            SET "type_name" = $1 
            WHERE "type_id" = $2 
            RETURNING "type_id", "type_name"`,
    delete: `DELETE FROM "type" 
            WHERE "type_id" = $1 
            RETURNING "type_id", "type_name"`
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

async function post(type) {
    const query = await pool.query(
        queryStrings.insert,
        [type.type_name]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, type) {
    const query = await pool.query(
        queryStrings.update,
        [type.type_name, id]);
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