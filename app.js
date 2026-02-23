const express = require("express")
const apiRouter = require("./routes/api.routes.js");

const cors = require('cors');

// creating the server
const app = express()

app.use(cors());

// setup, e.g. enabling JSON
app.use(express.json())

// Serve static files from the "public" folder
app.use("/api", express.static('public'))

app.use("/api", apiRouter);

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