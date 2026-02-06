const { fetchArticles, fetchArticleById, fetchCommentsByArticleId } = require("../models/articles.model.js")

exports.retrieveArticles = async () => {
    const articlesData = await fetchArticles();
    return articlesData;
}

exports.retrieveArticleById = async (articleId) => {
    const articleData = await fetchArticleById(articleId);
    return articleData;
}

exports.retrieveCommentsByArticleId = async (articleId) => {
    const commentsData = await Promise.all([fetchArticleById(articleId), fetchCommentsByArticleId(articleId)]);
    return commentsData[1];
}