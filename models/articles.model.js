const db = require("../db/connection.js")

exports.fetchArticles = async (sort_by = "created_at", order = "desc") => {
    const validSortBy= ["author", "title", "article_id", "topic", "created_at", "votes", "article_img_url", "comment_count"];
    const validOrder = ["asc", "desc"];

    if (!validSortBy.includes(sort_by) || !validOrder.includes(order)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }
    
    const awaitingQuery = await db.query(`
        SELECT 
            articles.author,
            articles.title,
            articles.article_id,
            articles.topic,
            articles.created_at,
            articles.votes,
            articles.article_img_url,
            CAST(COUNT(comments.comment_id) AS INT) AS comment_count
        FROM articles
        LEFT JOIN comments
        ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY articles.${sort_by} ${order};
        `)
    return awaitingQuery.rows;
}

exports.fetchArticleById = async (articleId) => {
    const awaitingQuery = await db.query(`
        SELECT * FROM articles 
        WHERE article_id = $1
        `, [articleId])

    if (awaitingQuery.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "ID Not Found" })
    }
    else {
        return awaitingQuery.rows[0];
    }

}

exports.fetchCommentsByArticleId = async (articleId) => {
    const awaitingQuery = await db.query(`
        SELECT * FROM comments 
        WHERE article_id = $1
        ORDER BY created_at DESC;
        `, [articleId])
    return awaitingQuery.rows;
}

exports.insertComment = async (articleId, username, body) => {
    const awaitingQuery = await db.query(`
        INSERT INTO comments (article_id, body, author)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [articleId, body, username])
    console.log(awaitingQuery)
    if (awaitingQuery.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "User Not Found" })
    }
    else {
        return awaitingQuery.rows;
    }
    
        
}

exports.incrementVotes = async (articleId, inc_votes) => {
    const awaitingQuery = await db.query(`
        UPDATE articles
        SET votes = votes + $2
        WHERE article_id = $1
        RETURNING *;
        `, [articleId, inc_votes])
    return awaitingQuery.rows;
}