const db = require("../db/connection.js")

exports.fetchTopics = async () => {
    const awaitingQuery = await db.query(`SELECT * FROM topics;`)
    return awaitingQuery.rows;
}

exports.checkTopicExists = async (topic) => {
    const { rows } = await db.query(
        `SELECT * FROM topics WHERE slug = $1;`, 
        [topic]
    );

    if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Topic not found" });
    }
};