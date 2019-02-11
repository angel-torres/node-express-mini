// implement your API here

const express = require('express');
const db = require('./data/db');
const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name && !user.bio) {
       res.status(400).json({ error: "Please provide name and bio for the user." }) 
    } else {
        db
        .insert(user)
        .then( user => {
            res.status(201).json({ success: true, user})
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
    }
})

server.get('/api/users', (req, res) => {
    db
    .find()
    .then(users => {
        res.status(200).json({success: true, users})
    })
    .catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })

})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db
    .findById(userId)
    .then( user => {
        res.status(200).json({ success: true, user })
    })
    .catch( err => {
        res.status(500).json({ error: "The user information could not be retrieved." })
    })
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    
    db
    .remove(userId)
    .then( deleted => {
        if (deleted) {
            res.status(200).json({success: true})
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch( err => {
        res.status(500).json({ error: "The user could not be removed" })
    })
})



server.listen(4000, () => {
    console.log('\n *** server listening *** \n')
})