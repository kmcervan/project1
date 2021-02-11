const express = require('express');

const usersRouter = require('./users/users-router');
const postsRouter = require('./posts/posts-router');
const mw = require('./middleware/middleware');

const server = express();

server.use(express.json());


// const Posts = require('./posts/posts-model');
// const Users = require('./users/users-model');

// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
