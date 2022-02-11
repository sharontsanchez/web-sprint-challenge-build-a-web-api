// Write your "actions" router here!

// Imports
const express = require('express');
const Action = require('./actions-model');
const { validateActionId, validateNewAction, validateUpdatedAction } = require("./actions-middlware");
const { handleError } = require("./../middleware");

// Declare Router 
const router = express.Router();


// Endpoints 
// [GET] /api/actions
router.get("/", async (req, res, next) => {
  try {
    const actions = await Action.get();
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});
// [GET] /api/actions/:id
router.get("/:id", validateActionId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const targetAction = await Action.get(id);
    res.status(200).json(targetAction);
  } catch (err) {
    next(err);
  }
});

// [POST] /api/actions
router.post("/", validateNewAction, async (req, res, next) => {
  try {
    const { project_id, description, notes, completed = false } = req.body;
    const newAction = await Action.insert({
      project_id,
      description,
      notes,
      completed,
    });
    res.status(201).json(newAction);
  } catch (err) {
    next(err);
  }
});

// // [PUT] /api/actions/:id
router.put(
  "/:id",
  validateActionId,
  validateUpdatedAction,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedAction = await Action.update(id, req.body);
      res.status(200).json(updatedAction);
    } catch (err) {
      next(err);
    }
  }
);

// // [DELETE] /api/actions/:id
// router.delete("/:id", async (req, res, next) => {});

// Error Handling 
router.use(handleError);

// Exports
module.exports = router;