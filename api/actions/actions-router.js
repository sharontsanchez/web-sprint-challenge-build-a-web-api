// Write your "actions" router here!

// Imports
const express = require('express');
const Action = require('./actions-model');
// const { validateActionId } = require("./actions-middleware");
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
router.get("/:id", async (req, res, next) => {});

// [POST] /api/actions
router.post("/", async (req, res, next) => {});

// [PUT] /api/actions/:id
router.put("/:id", async (req, res, next) => {});

// [DELETE] /api/actions/:id
router.delete("/:id", async (req, res, next) => {});

// Error Handling 
router.use(handleError);

// Exports
module.exports = router;