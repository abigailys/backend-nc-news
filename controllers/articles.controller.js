const { retrieveArticles } = require("../services/articles.service.js")

exports.getArticles = async (request, response) => {
    const articles = await retrieveArticles();
    response.status(200).send({ articles: articles })
}