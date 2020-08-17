const express = require("express");
const projects = require("./data/helpers/projectModel");
const actions = require("./data/helpers/actionModel");
const projectRouter = express.Router();

//Get Project by ID

projectRouter.get("/projects/:id", (req, res, next) => {
  projects
    .get(req.params.id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      }
    })
    .catch(next);
});

// Get action by ID

projectRouter.get("/projects/:id/actions/:actionsID", (req, res, next) => {
  actions
    .get(req.params.actionsID)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      }
    })
    .catch(next);
});

module.exports = projectRouter;
