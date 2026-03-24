const { fetchCommentById, deleteComment } = require("../models/comments.model.js")

exports.retrieveCommentById = async (commentId) => {
    const commentData = await fetchCommentById(commentId);
    return commentData;
}

exports.deleteCommentById = async (commentId) => {
    await deleteComment(commentId);
}