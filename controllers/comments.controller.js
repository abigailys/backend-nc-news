const { retrieveCommentById } = require("../services/comments.service.js")

exports.getCommentById = async (request, response, next) => {
    try {
            const { commentId } = request.params;
    
            if (isNaN(commentId)) {
                return next({ status: 400, msg: "Bad Request" }) // return to kill the function, next(argument) to skip all regular middleware and jump straight to error handling middleware in app.js
            }
    
            const comment = await retrieveCommentById(commentId);
            response.status(200).send({ comment: comment })
        }
        catch (error) {
            next(error);
        };
}