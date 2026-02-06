const db = require("../db/connection.js")

exports.fetchArticles = async () => {
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
        ORDER BY articles.created_at DESC;
        `)
    return awaitingQuery.rows;
}

exports.fetchArticleById = async (articleId) => {
    const awaitingQuery = await db.query(`
        SELECT * FROM articles WHERE article_id = $1`, [articleId]
        )
    return awaitingQuery.rows[0];
}