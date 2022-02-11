// add middlewares here related to projects


const Project = require("./projects-model");


const handleError = (err, req, res) => {
    res.status(err.status || 500).json({
        message: err.message,
    })
}

const validateProjectId = async (req, res, next) => {
    try{
        const { id } = req.params;
        const targetProject = await Project.get(id);
        if (targetProject) {
            next();
        } else {
            next({
                status:404,
                message: `Project with ID#${id} cannot be found.`
            });
        }

    } catch (err){
        next(err);
    }
};




module.exports = { handleError, validateProjectId };