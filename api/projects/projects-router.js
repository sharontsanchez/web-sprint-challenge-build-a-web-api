// Write your "projects" router here!

// Imports
const express = require('express');
const Projects = require('./projects-model');
const { validateProjectId, validateNewProject, validateUpdatedProject, } = require('./projects-middleware');
const { handleError } = require('./../middleware');

// Declare Router 
const router = express.Router();


// Endpoints

// `[GET] /api/projects`

router.get('/', async (req, res, next) => {
    try{
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch(err){
        next(err);
        }
    });

// `[GET] /api/projects/:id`

router.get("/:id", validateProjectId, async (req, res, next) => {
    try{
        const { id } = req.params;
        const project = await Projects.get(id);
        res.status(200).json(project);
    }catch (err){
        next(err)
    }
});

// `[POST] /api/projects`

router.post("/", validateNewProject, async (req, res, next) => {
    try {
      const { name, description, completed = false } = req.body;
      const newProject = await Projects.insert({
        name,
        description,
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
        const { name, description, completed } = req.body;
        const updatedProject = await Projects.update(id, {
          name,
          description,
          completed,
        });
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
      await Projects.remove(id);
      res.end(); 
    } catch (err) {
      next(err);
    }
  });

// `[GET] /api/projects/:id/actions`

// Error Handling 
router.use(handleError);

// Exports
module.exports = router;


