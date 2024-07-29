import fs from 'fs';
import path from 'path';
import notes from './data/notes.json' assert { type: 'json' };
import express from 'express';

// const { notes } = require('./data/notes');


const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse incoming string or array data 
app.use(express.urlencoded({ extended: true }));

// Middleware to parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// REMEMBER: This route should take us to /notes
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes/:id', (req, res) => {
    const result = findByID(req.params.id, notes);
    res.json(result);
});

app.post('/api/notes', (req, res) => {
    // This method will only work as long as we don't remove any data from notes.json. If we do, the id numbers will be thrown off and we'll end up with a duplicate value at some point.
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        // Add notes to json file and notes array
        const note = createNewNotes(req.body, notes);
        //req.body is where our incoming content will be
        res.json(note);
    }
});

// '/' brings us to the root route of the server! This is the route used to create a homepage for a server.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// Reminder: app.listen should always be last. 
app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}!`);
});
