const express = require("express")
const router = express.Router()
const { getArticles, getArticleById } = require("../controllers/articles.controller.js")

router.get("/", getArticles);

router.get("/:articleId", getArticleById);

module.exports = router