const express = require("express")

// creating the server
const app = express()

// setup, e.g. enabling JSON
app.use(express.json())

// hook up the router
const topicsRouter = require("./routes/topics.routes.js")
app.use("/api/topics", topicsRouter) // anything starting /api/topics goes to topics router

const articlesRouter = require("./routes/articles.routes.js")
app.use("/api/articles", articlesRouter)

const usersRouter = require("./routes/users.routes.js")
app.use("/api/users", usersRouter)

app.use((error, request, response, next) => {
    if (error.status && error.msg) {
        response.status(error.status).send({ message: error.msg })
    } else {
        next(error)
    }
})

app.use((error, request, response, next) => {
    console.log(error) // for internal debugging
    response.status(500).send({ message: "Internal Server Error"})
})

module.exports = app;