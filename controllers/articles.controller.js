const { retrieveArticles, retrieveArticleById } = require("../services/articles.service.js")

exports.getArticles = async (request, response) => {
    const articles = await retrieveArticles();
    response.status(200).send({ articles: articles })
}

exports.getArticleById = async (request, response) => {
    const { articleId } = request.params;
    const article = await retrieveArticleById(articleId);
    response.status(200).send({ article: article })
}