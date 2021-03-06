const express = require('express');
const cors = require('cors');
const port = 3003;
const server = express()

const app = require('./src/app')

server.use(express.json())
server.use(app)
server.use(cors())

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})