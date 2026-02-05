const express = require("express")
const router = express.Router()
const { getArticles } = require("../controllers/articles.controller.js")

router.get("/", getArticles);

module.exports = router