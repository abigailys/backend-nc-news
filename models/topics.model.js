const db = require("../db/connection.js")

exports.fetchTopics = async () => {
    const awaitingQuery = await db.query(`SELECT * FROM topics;`)
    return awaitingQuery.rows;
}
