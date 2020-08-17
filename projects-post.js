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

//Get all project actions

projectRouter.get("/projects/:id/actions", (req, res, next) => {
  actions
    .get()
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

//Add New Project

projectRouter.post("/projects", (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      errorMessage: "Please provide name and description for the project."
    });
  }

  projects
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(next);
});

// Add new Action

projectRouter.post("/projects/:id/actions", (req, res, next) => {
  if (!req.params.id) {
    res.status(404).json({
      message: "The project with the specified ID does not exist."
    });
  } else if (!req.body.description || !req.body.notes) {
    res.status(400).json({
      errorMessage: "Please provide description and notes for the action."
    });
  } else {
    actions
      .insert({ ...req.body, project_id: req.params.id })
      .then(action => {
        res.status(201).json(action);
      })
      .catch(next);
  }
});

module.exports = projectRouter;
