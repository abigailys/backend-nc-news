const db = require("../db/connection.js")

exports.fetchUsers = async () => {
    const awaitingQuery = await db.query(`
        SELECT * FROM users;
    `)
    return awaitingQuery.rows;
}