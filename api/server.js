// imports here
const express = require('express');

// Configure your server here
const server = express();


// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

server.use('./api/actions', actionsRouter)
server.use('./api/projects', projectsRouter)

server.use(express.json());



// Do NOT `server.listen()` inside this file!

module.exports = server;
