const express = require("express");
const apiRouter = express.Router();

const ideasRouter = require("./ideas");
const minionsRouter = require("./minions");

apiRouter.use("/ideas", ideasRouter);
apiRouter.use("/minions", minionsRouter);

module.exports = apiRouter;
