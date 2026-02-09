const { retrieveArticles, retrieveArticleById, retrieveCommentsByArticleId, createComment, updateVotes } = require("../services/articles.service.js")

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
            return next({ status: 400, msg: "Invalid article ID" })
        }

        const comments = await retrieveCommentsByArticleId(articleId);
        response.status(200).send({ comments: comments })
    }
    catch (error) {
        next(error);
    }
}

exports.postComment = async (request, response, next) => {
    try {
        const { articleId } = request.params
        
        if (isNaN(articleId)) {
            return next({ status: 400, msg: "Invalid article ID"})
        }

        const { username, body } = request.body
        const comment = await createComment(articleId, username, body);
        response.status(201).send({ comment: comment[0]})
    }
    catch (error) {
        next(error);
    }
}

exports.updateArticle = async (request, response, next) => {
    try {
        const { articleId } = request.params
        if (isNaN(articleId)) {
            return next({ status: 400, msg: "Invalid article ID"})
        }

        const { inc_votes } = request.body;
        const article = await updateVotes(articleId, inc_votes);
        console.log("article: ", article)
        response.status(200).send({ updatedArticle: article[0] })
    }
    catch (error) {
        next(error);
    }
}