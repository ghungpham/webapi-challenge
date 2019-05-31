const express = require('express');
const helmet = require ('helmet')
const project = require ('./data/helpers/projectModel');
const action = require ('./data/helpers/actionModel');

const server = express();
server.use(express.json());


server.get('/', (req, res) => {
    res.send(' <h2>Finally</h2> ')
})


module.exports = server;