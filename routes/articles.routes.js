const express = require("express")
const router = express.Router()
const { getArticles, getArticleById, getCommentsByArticleId, postComment } = require("../controllers/articles.controller.js")

router.get("/", getArticles);

router.get("/:articleId", getArticleById);

router.get("/:articleId/comments", getCommentsByArticleId);

router.post("/:articleId/comments", postComment);


module.exports = router