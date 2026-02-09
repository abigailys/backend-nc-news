const express = require("express")
const router = express.Router()
const { getCommentById, removeComment } = require("../controllers/comments.controller.js")

router.get("/:commentId", getCommentById)

router.delete("/:commentId", removeComment)

module.exports = router