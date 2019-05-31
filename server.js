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
        } else {res.status(201).json({message: "Project added!", project }) }
    })
    .catch(err => {
        res.status(500).json({message: "Process cannot be done"})
    })
})

server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body
    project
    .update(id, {name, description, completed})
    .then(project => {
        res.status(202).json({message: "Project updated!", project})
    })
    .catch(err => {
        res.status(500).json({message: "Process cannot be done"}) 
    })
})

server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    project
    .remove(id)
    .then(project => {
        res.status(202).json({message: "Project removed!"})
    })
    .catch(err => {
        res.status(500).json({message: "Process cannot be done"})
    })
})

server.get('/projects/actions/:projectId', (req, res) => {
    const { projectId } = req.params;
    project
    .getProjectActions(projectId)
    .then(actions => {
        if(!actions){res.status(400).json({message: "Project cannot be found"})
        } else { res.status(200).json(actions)}
    })
    .catch(err => {
        res.status(500).json({message: "Process cannot be done"})
    })
})

////actions

server.get('/actions/:id', (req, res) => {
    const { id } = req.params;
    action
    .get(id)
    .then(action =>{
        if (!action){res.status(400).json({message: "action cannot be found"})
        } else {res.status(200).json(action)} 
    })
    .catch(err => {
        res.status(500).json({message: "Sorry cannot be done"})
    })
})

server.post('/actions', (req, res) => {
    const {project_id, description, notes} = req.body
    action
    .insert({project_id, description, notes})
    .then(action =>{
        if (!project_id){res.status(400).json({message: "must provide project"})
        } else {
            if (!description){res.status(400).json({message: "must provide description"})
            } else if (description.length > 128){res.status(400).json({message: "Characters over 128"})
            } else {!notes}{res.status(400).json({message: "must provide description"})}
        res.status(200).json(action)}
        })
    .catch(err => {
        res.status(500).json({message: "Sorry cannot be done"})
    })
})

server.put('/actions/:id', (req, res) => {
    const { id } = req.params;
    const { description, notes, completed } = req.body
    action
    .update(id, {description, notes, completed})
    .then(action => {
        res.status(202).json({message: "Action updated!", action})
    })
    .catch(err => {
        res.status(500).json({message: "Process cannot be done"}) 
    })
})

server.delete('/actions/:id', (req, res) => {
    const { id } = req.params;
    action
    .remove(id)
    .then(action => {
        res.status(202).json({message: "Action removed!"})
    })
    .catch(err => {
        res.status(500).json({message: "Process cannot be done"})
    })
})
module.exports = server;