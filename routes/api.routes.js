const express = require('express');
const apiRouter = express.Router();

const topicsRouter = require("./topics.routes.js");
const articlesRouter = require("./articles.routes.js");
const usersRouter = require("./users.routes.js");
const commentsRouter = require("./comments.routes.js");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;