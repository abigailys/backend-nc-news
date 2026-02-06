const { fetchArticles, fetchArticleById } = require("../models/articles.model.js")

exports.retrieveArticles = async () => {
    const articlesData = await fetchArticles();
    return articlesData;
}

exports.retrieveArticleById = async (articleId) => {
    const articleData = await fetchArticleById(articleId);
    return articleData;
}
