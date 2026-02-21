const { fetchArticles, fetchArticleById, fetchCommentsByArticleId, insertComment, incrementVotes } = require("../models/articles.model.js")
const { fetchUserByUsername } = require("../models/users.model.js")
const { checkTopicExists } = require("../models/topics.model.js")

exports.retrieveArticles = async (sort_by, order, topic) => {
    if (topic) {
        await checkTopicExists(topic); 
    }
    const articlesData = await fetchArticles(sort_by, order, topic);
    return articlesData;
}

exports.retrieveArticleById = async (articleId) => {
    const articleData = await fetchArticleById(articleId);
    return articleData;
}

exports.retrieveCommentsByArticleId = async (articleId) => {
    const commentsData = await Promise.all([fetchArticleById(articleId), fetchCommentsByArticleId(articleId)]); //use fetchArticleById to confirm article existence
    return commentsData[1];
}

exports.createComment = async (articleId, username, body) => {
    const commentData = await Promise.all([fetchUserByUsername(username), fetchArticleById(articleId), insertComment(articleId, username, body)])
    return commentData[2];
}

exports.updateVotes = async (articleId, inc_votes) => {
    const updatedArticleData = await Promise.all([fetchArticleById(articleId), incrementVotes(articleId, inc_votes)])
    return updatedArticleData[1];
}