const { retrieveCommentById, deleteCommentById } = require("../services/comments.service.js")

exports.getCommentById = async (request, response, next) => {
    try {
        const { commentId } = request.params;

        if (isNaN(commentId)) {
            return next({ status: 400, msg: "Bad Request" })
        }

        const comment = await retrieveCommentById(commentId);
        response.status(200).send({ comment: comment })
    }
    catch (error) {
        next(error);
    };
}

exports.removeComment = async (request, response, next) => {
    try {
        const { commentId } = request.params;

        if (isNaN(commentId)) {
            return next({ status: 400, msg: "Bad Request" })
        }

        const comment = await deleteCommentById(commentId);
        response.sendStatus(204)
    }
    catch (error) {
        next(error);
    };
}