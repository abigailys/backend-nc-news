const express = require("express")

// creating the server
const app = express()

// setup, e.g. enabling JSON
app.use(express.json())

// hook up the router
const topicsRouter = require("./routes/topics.routes.js")
app.use("/api/topics", topicsRouter) // anything starting /api/topics goes to topics router

// app.use()
// this is a function Express provides to "hook stuff up" to the server

module.exports = app;