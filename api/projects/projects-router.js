// Write your "projects" router here!

// Imports
const express = require('express');
const Project = require('./projects-model');
const { 
  validateProjectId, 
  validateNewProject, 
  validateUpdatedProject, 
} = require('./projects-middleware');
const { handleError } = require('./../middleware');

// Declare Router 
const router = express.Router();


// Endpoints

// `[GET] /api/projects`

router.get('/', async (req, res, next) => {
    try{
        const projects = await Project.get();
        res.status(200).json(projects);
    } catch(err){
        next(err);
        }
    });

// `[GET] /api/projects/:id`

router.get("/:id", validateProjectId, async (req, res, next) => {
    try{
        const { id } = req.params;
        const targetProject = await Project.get(id);
        res.status(200).json(targetProject);
    } catch (err){
        next(err)
    }
});

// `[POST] /api/projects`

router.post("/", validateNewProject, async (req, res, next) => {
    try {
      const { completed = false } = req.body;
      const newProject = await Project.insert({
        ...req.body,
        completed,
      });
      res.status(201).json(newProject);
    } catch (err) {
      next(err);
    }
  });

// `[PUT] /api/projects/:id`

router.put(
    "/:id",
    validateProjectId,
    validateUpdatedProject,
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const updatedProject = await Project.update(id, req.body);
        res.status(200).json(updatedProject);
      } catch (err) {
        next(err);
      }
    }
  );
  

// `[DELETE] /api/projects/:id`

router.delete("/:id", validateProjectId, async (req, res, next) => {
    try {
      const { id } = req.params;
      await Project.remove(id);
      res.end()
    } catch (err) {
      next(err);
    }
  });

// `[GET] /api/projects/:id/actions`

router.get("/:id/actions", validateProjectId, async (req, res, next) => {
    try {
      const { id } = req.params;
      const targetProject = await Project.get(id);
      res.status(200).json(targetProject.actions);
    } catch (err) {
      next(err);
    }
  });

// Error Handling 
router.use(handleError);

// Exports
module.exports = router;


