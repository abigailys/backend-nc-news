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

const commentsRouter = require("./routes/comments.routes.js")
app.use("/api/comments", commentsRouter)

// INVALID PATH CATCH-ALLL
app.all("/*path", (req, res) => {
    res.status(404).send({ message: "Path Not Found" });
});

// CUSTOM ERROR HANDLING FOR ALL MIDDLEWARE FUNCTIONS
app.use((error, request, response, next) => {
    if (error.status && error.msg) {
        response.status(error.status).send({ message: error.msg })
    } else {
        next(error)
    }
})

// SAFETY NET FOR ALL UNHANDLED ERRORS
app.use((error, request, response, next) => {
    console.log(error) // for internal debugging
    response.status(500).send({ message: "Internal Server Error"})
})

module.exports = app;