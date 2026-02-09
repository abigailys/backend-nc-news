const db = require("../db/connection.js")

exports.fetchCommentById = async (commentId) => {
    const awaitingQuery = await db.query(`
        SELECT * FROM comments
        WHERE comment_id = $1
        `, [commentId])
    
    if (awaitingQuery.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "ID Not Found" })
    }
    else {
        return awaitingQuery.rows[0];
    }
}

exports.deleteComment = async (commentId) => {
    const awaitingQuery = await db.query(`
        DELETE FROM comments
        WHERE comment_id = $1
        `, [commentId])
    return awaitingQuery.rows;
}