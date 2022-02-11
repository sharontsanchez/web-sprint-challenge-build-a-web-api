// imports here
const express = require('express');
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');
const { logger } = require('./middleware');

// Configure your server here
const server = express();

// Middleware
server.use(express.json());
server.use(logger);

// Build your actions router in /api/actions/actions-router.js
server.use('./api/actions', actionsRouter);
// Build your projects router in /api/projects/projects-router.js
server.use('./api/projects', projectsRouter);



server.get('/', (req, res) => {
    res.send('server has been set up!')
})

// Do NOT `server.listen()` inside this file!

module.exports = server;
