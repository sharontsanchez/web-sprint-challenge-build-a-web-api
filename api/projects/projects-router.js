// Write your "projects" router here!

// Imports
const express = require('express');
const Projects = require('./projects-model');
const { handleError, validateProjectId } = require('./projects-middleware');

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
    }
)

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

// `[PUT] /api/projects/:id`

// `[DELETE] /api/projects/:id`

// `[GET] /api/projects/:id/actions`

// Error Handling 
router.use(handleError);

// Exports
module.exports = router;


