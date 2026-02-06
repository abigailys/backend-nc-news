const express = require("express")
const router = express.Router()
const { getArticles, getArticleById, getCommentsByArticleId } = require("../controllers/articles.controller.js")

router.get("/", getArticles);

router.get("/:articleId", getArticleById);

router.get("/:articleId/comments", getCommentsByArticleId);


module.exports = router