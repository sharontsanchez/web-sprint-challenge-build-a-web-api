# Sprint Challenge Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **how to build web services based on the REST (REpresentational State Transfer) architectural style**. During this sprint, you studied **Node.js and Express, server side routing, how to write Express middleware and how to deploy an API to Heroku**.

In your challenge this week, you will demonstrate your mastery of these skills by designing and creating a web API to manage the following resources: `Projects` and `Actions`.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers the Monday after challenge submissions. For more information on the review process [click here](https://www.notion.so/bloomtech/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a).

You are not allowed to collaborate during the sprint challenge.

## Introduction

In meeting the minimum viable product (MVP) specifications listed below, your project should provide an API that has Create, Read, Update and Delete (CRUD) functionality for both `projects` and `actions`.

## Instructions

### Task 1: Project Set Up

- [x] Run `npm install` to install your dependencies.
- [x] Run tests locally executing `npm test`.
- [x] Reset the database to its original state executing `npm run resetdb`.

### Task 2: Project Requirements (MVP)

Your finished project must include all of the following requirements:

#### NPM Scripts

A _"test"_ script already exists you can use to run tests against your code.
A _"resetdb"_ script exists that allows you to reset the database to its original state.

- [x] Write an _npm script_ named _"start"_ that uses `node` to run the API server.
- [x] Write an _npm script_ named _"server"_ that uses `nodemon` to run the API server.
- [x] Install _nodemon_ as a development dependency that would not be used in production.

#### Environment Variables

- [x] Bring the port number from the `process.env` variable, falling back to `9000` if `process.env.PORT` is undefined **!!!**

#### Endpoints

Inside `api/projects/projects-router.js` build the following endpoints:

- [x] `[GET] /api/projects`
  - Returns an array of projects as the body of the response.
  - If there are no projects it responds with an empty array.
- [x] `[GET] /api/projects/:id`
  - Returns a project with the given `id` as the body of the response.
  - If there is no project with the given `id` it responds with a status code 404.
- [x] `[POST] /api/projects`
  - Returns the newly created project as the body of the response.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [x] `[PUT] /api/projects/:id`
  - Returns the updated project as the body of the response.
  - If there is no project with the given `id` it responds with a status code 404.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [x] `[DELETE] /api/projects/:id`
  - Returns no response body.
  - If there is no project with the given `id` it responds with a status code 404.
- [x] `[GET] /api/projects/:id/actions`
  - Returns an array of actions (could be empty) belonging to a project with the given `id`.
  - If there is no project with the given `id` it responds with a status code 404.

Inside `api/actions/actions-router.js` build endpoints for performing CRUD operations on _actions_:

- [x] `[GET] /api/actions`
  - Returns an array of actions (or an empty array) as the body of the response.
- [x] `[GET] /api/actions/:id`
  - Returns an action with the given `id` as the body of the response.
  - If there is no action with the given `id` it responds with a status code 404.
- [x] `[POST] /api/actions`
  - Returns the newly created action as the body of the response.
  - If the request body is missing any of the required fields it responds with a status code 400.
  - When adding an action make sure the `project_id` provided belongs to an existing `project`.
- [x] `[PUT] /api/actions/:id`
  - Returns the updated action as the body of the response.
  - If there is no action with the given `id` it responds with a status code 404.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [x] `[DELETE] /api/actions/:id`
  - Returns no response body.
  - If there is no action with the given `id` it responds with a status code 404.

#### Middleware functions

- [x] Write at least two middleware functions for this API, and consume them in the proper places of your code.

### Database Schemas

The description of the structure and extra information about each _resource_ stored in the included database (`./data/database.db3`) is listed below.

#### Projects

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | do not provide it when creating projects, the database will generate it     |
| name        | string    | required                                                                    |
| description | string    | required                                                                    |
| completed   | boolean   | not required, defaults to false when creating projects                      |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | do not provide it when creating actions, the database will generate it                           |
| project_id  | number    | required, must be the id of an existing project                                                  |
| description | string    | required, up to 128 characters long                                                              |
| notes       | string    | required, no size limit. Used to record additional notes or requirements to complete the action  |
| completed   | boolean   | not required, defaults to false when creating actions                                            |

### Database Persistence Helpers

The project includes models you can use to manage the persistence of _project_ and _action_ data. These files are `api/projects/projects-model.js` and `api/actions/actions-model.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Remember to use .then().catch() or async/await.**

- `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projects-model.js` includes an extra method called `getProjectActions()` that takes a _project id_ as its only argument and returns a list of all the _actions_ for the _project_.

We have provided test data for all the resources.

**Important Notes:**

- Do not make changes to your `package.json` except to add **additional** dependencies and scripts. Do not update existing packages.
- Your app must be able to run in Node v.12. Do not use newer features of Node (e.g.: optional chaining and nullish coalescing NOT supported).
- Use an HTTP client like `HTTPie`, `Postman` or `Insomnia` to manually test the API's endpoints.
- Use Express Routers to organize your endpoints.
- Even though you are only required to write two middleware functions, it is advised that you leverage middlewares as much as possible.
- You are welcome to create additional files, but **do not move or rename existing files** or folders.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing including spell-checking and grammar-checking on your work.

## Submission format

- [ ] Submit via Codegrade by pushing commits to your `main` branch.
- [ ] Check Codegrade before the deadline to compare its results against your local tests.
- [ ] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [ ] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics. You might prepare by writing down your own answers before hand.

1. The core features of Node.js and Express and why they are useful.

Node is an open-source, cross-platform runtime environment that allows developers to create all kinds of server-side tools and applications in JavaScript. Node.js is well-supported by many web hosting providers, that often provide specific infrastructure and documentation for hosting Node sites. It has a very active third party ecosystem and developer community, with lots of people who are willing to help.
Express is the most popular Node web framework, and is the underlying library for a number of other popular Node web frameworks. It provides mechanisms to:
Write handlers for requests with different HTTP verbs at different URL paths (routes). Set common web application settings like the port to use for connecting, and the location of templates that are used for rendering the response. Add additional request processing "middleware" at any point within the request handling pipeline.

2. Understand and explain the use of Middleware.

Middleware is a term for any software or service that enables the parts of a system to communicate and manage data. It is the software that handles communication between components and input/output, so developers can focus on the specific purpose of their application.
There are three different categories of middleware:
Built-in middleware
Third-party middleware
Custom middleware
Middleware used to refer to pre-built software components that can be added to the framework's request/response processing pipeline, to handle tasks such as database access.

3. The basic principles of the REST architectural style.

REST is a generally agreed-upon set of principles and constraints. They are recommendations, not a standard.

When designing a RESTful Web API, keep these principles in mind:

Everything is a resource.
Each resource is accessible via a unique URI.
Resources can have multiple representations.
Communication happens over a stateless protocol (HTTP).
Resource management happens via HTTP methods.
Applying the REST architecture to our APIs can make them scalable and simpler to maintain and extend.

REST APIs have six constraints: 
client-server architecture
stateless architecture: each request should stand on its own, and order should not matter. No shared state.
cacheable:  improves network performance. 
layered system: there are layers between a client and a server like logging, caching, DNS server, load balancers and authentication.
code on demand: 
The API returns the resource and code to act on it.
The client only needs to know how to execute the code.
Makes the API more flexible, upgradeable, and extendible.
Most web applications send JavaScript code along with the data.
uniform interfaces: Each resource should be accessible through a single URL. 


4. Understand and explain the use of Express Routers.

The express.Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests. 
Express Router is a built-in class that refers to how an application’s endpoints (URIs) respond to client requests. The express router class helps in the creation of route handlers.
You can define routing using methods of the Express app object that correspond to HTTP methods; for example, app.get() to handle GET requests and app.post to handle POST requests.

5. Describe tooling used to manually test the correctness of an API.

Postman is a Google chrome app used for verifying and automating API testing. It is a prevalent tool used to test APIs manually. It comes loaded with a lot of useful features that make testing APIs easy. We can also use HTTPie to manually test the API through the terminal inside of VS code. HTTPie is a command-line HTTP client and its goal is to make CLI interaction with web services as human-friendly as possible. It is designed for testing, debugging, and interacting with APIs. 