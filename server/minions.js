const minionsRouter = require("express").Router();

module.exports = minionsRouter;

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

minionsRouter.param("id", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

//GET array of all minions
minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

//POST create new minon and save to database
minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

//GET single minion by id
minionsRouter.get("/:id", (req, res, next) => {
  res.send(req.minion);
});

//PUT update a single minion by id
minionsRouter.put("/:id", (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase("minions", req.body);
  res.send(updatedMinion);
});

//DELETE a single minion by id
minionsRouter.delete("/:id", (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId("minions", req.params.id);
  if (deletedMinion) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});
