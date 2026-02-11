const db = require("../db/connection.js")

exports.fetchUsers = async () => {
    const awaitingQuery = await db.query(`
        SELECT * FROM users;
    `)
    return awaitingQuery.rows;
}

exports.fetchUserByUsername = async (username) => {
    const awaitingQuery = await db.query(`
        SELECT * FROM users
        WHERE username  = $1
        `, [username])

    if (awaitingQuery.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "User Not Found" })
    }
    else {
        return awaitingQuery.rows[0];
    }
}