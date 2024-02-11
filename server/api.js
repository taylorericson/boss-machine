const express = require("express");
const apiRouter = express.Router();

const ideasRouter = require("./ideas");

apiRouter.use("/ideas", ideasRouter);

module.exports = apiRouter;
