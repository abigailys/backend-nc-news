const { fetchCommentById, deleteComment } = require("../models/comments.model.js")

exports.retrieveCommentById = async (commentId) => {
    const commentData = await fetchCommentById(commentId);
    return commentData;
}

exports.deleteCommentById = async (commentId) => {
    const deletionData = await Promise.all([fetchCommentById(commentId), deleteComment(commentId)]);
    return deletionData[1];
}