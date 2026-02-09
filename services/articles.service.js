const { fetchArticles, fetchArticleById, fetchCommentsByArticleId, insertComment, incrementVotes } = require("../models/articles.model.js")

exports.retrieveArticles = async () => {
    const articlesData = await fetchArticles();
    return articlesData;
}

exports.retrieveArticleById = async (articleId) => {
    const articleData = await fetchArticleById(articleId);
    return articleData;
}

exports.retrieveCommentsByArticleId = async (articleId) => {
    const commentsData = await Promise.all([fetchArticleById(articleId), fetchCommentsByArticleId(articleId)]); //use fetchArticleById to confirm article existence
    return commentsData[1];
}

exports.createComment = async (articleId, username, body) => {
    const commentData = await Promise.all([fetchArticleById(articleId), insertComment(articleId, username, body)])
    return commentData[1];
}

exports.updateVotes = async (articleId, inc_votes) => {
    const updatedArticleData = await Promise.all([fetchArticleById(articleId), incrementVotes(articleId, inc_votes)])
    return updatedArticleData[1];
}