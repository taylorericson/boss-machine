const ideasRouter = require("express").Router();

module.exports = ideasRouter;

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

const checkMillionDollarIdea = require("./checkMillionDollarIdea");

ideasRouter.param("id", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

//GET array of all ideas
ideasRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("ideas"));
});

//POST new idea and save to database
ideasRouter.post("/", (req, res, next) => {
  const newIdea = addToDatabase("ideas", req.body);
  res.status(201).send(newIdea);
});

//GET a single idea by id
ideasRouter.get("/:id", (req, res, next) => {
  res.send(req.idea);
});

//PUT update a single id by id
ideasRouter.put("/:id", (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase("ideas", req.body);
  res.send(updatedIdea);
});

//DELETE a signle id by id
ideasRouter.delete("/:id", (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId("ideas", req.params.id);
  if (deletedIdea) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});
