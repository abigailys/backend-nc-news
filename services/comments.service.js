const { fetchCommentById } = require("../models/comments.model.js")

exports.retrieveCommentById = async (commentId) => {
    const commentData = await fetchCommentById(commentId);
    return commentData;
}