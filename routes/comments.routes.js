const express = require("express")
const router = express.Router()
const { getCommentById } = require("../controllers/comments.controller.js")

router.get("/:commentId", getCommentById)

module.exports = router