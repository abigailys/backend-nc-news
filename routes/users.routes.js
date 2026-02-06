const express = require("express")
const router = express.Router()
const { getUsers } = require("../controllers/users.controller.js")

router.get("/", getUsers);

module.exports = router;