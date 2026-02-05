const { fetchArticles } = require("../models/articles.model.js")

exports.retrieveArticles = async () => {
    const articlesData = await fetchArticles();
    return articlesData;
}
