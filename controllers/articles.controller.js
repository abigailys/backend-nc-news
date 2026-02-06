const { retrieveArticles, retrieveArticleById, retrieveCommentsByArticleId } = require("../services/articles.service.js")

exports.getArticles = async (request, response, next) => {
    try {
        const articles = await retrieveArticles();
        response.status(200).send({ articles: articles })
    }
    catch (error) {
        next(error);
    };
}

exports.getArticleById = async (request, response, next) => {
    try {
        const { articleId } = request.params;

        if (isNaN(articleId)) {
            return next({ status: 400, msg: "Bad Request" }) // return to kill the function, next(argument) to skip all regular middleware and jump straight to error handling middleware in app.js
        }

        const article = await retrieveArticleById(articleId);
        response.status(200).send({ article: article })
    }
    catch (error) {
        next(error);
    };
}

exports.getCommentsByArticleId = async (request, response, next) => {
    try {
        const { articleId } = request.params

        if (isNaN(articleId)) {
            return next({ status: 400, msg: "Bad Request" })
        }

        const comments = await retrieveCommentsByArticleId(articleId);
        response.status(200).send({ comments: comments })
    }
    catch (error) {
        next(error);
    }
}