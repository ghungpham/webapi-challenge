const express = require('express');
const helmet = require ('helmet')
const project = require ('./data/helpers/projectModel');
const action = require ('./data/helpers/actionModel');

const server = express();
server.use(express.json());
server.use(helmet());



server.get('/', (req, res) => {
    res.send(' <h2>Finally</h2> ')
})

server.get('/projects/:id', (req,res) => {
    const { id } = req.params;
    project
    .get(id)
    .then(project => {
        if(!project){
         res.status(400).json({message: "ID cannnot be found"
        })
        } else { res.status(200).json(project)}
    })
    .catch(err => {
        res.status(500).json({message: 'Process cannot be done'})
    })
})

server.post('/projects', (req,res) => {
    const { name, description } = req.body;
    project
    .insert({name, description})
    .then(project => {
        ///if missing name and description, handling error
        if (!name){res.status(400).json({message:"Missing name field"})
        } else if (!description){res.status(400).json({message:"Missing description field"})
        } else {res.status(201).json({message: "Project added!"}) }
    })
    .catch(err => {
        res.status(500).json({message: "Process cannot be done"})
    })
})



module.exports = server;