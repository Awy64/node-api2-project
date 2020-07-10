const express = require('express');
const server = express();
const postsRouter = require('./routes/posts-router.js');
const cors = require('cors');

server.use(express.json());
server.use(cors({origin: "*"}));
server.use("/api/posts", postsRouter);



server.get('/', (req, res) => {
  res.status(200).send(`<div>Welcome to my API</div>`)
});

module.exports = server