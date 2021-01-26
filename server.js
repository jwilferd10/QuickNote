const fs = require('fs');
const { notes } = require('./data/notes');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express ();

const path = require('path')


// Middleware that instructs the server to make certain files readily available and to not gate it behind a server endpoint.
// Provide a file path to a location in our application and instruct the server to make these files static resources.
app.use(express.urlencoded({ extended: true })); // parse incoming string or array data
app.use(express.json()); // parse incoming JSON data
app.use(express.static('public')); //Should allow us to get CSS styles up.

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(notes => notes.title === query.title);        
    }
    if (query.text) {
        filteredResults = filteredResults.filter(notes => notes.text === query.text);
    }
    // return the filtered results:
    return filteredResults;
}

function findByID(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
}

// Create new notes
function createNewNotes(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './data/notes.json'),
        JSON.stringify({ notes: notesArray}, null, 2)
    );
    // return finished code to post route for response
    return note;
}

// Check if each key not only exists, but that it is also the right type of data.
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

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
    // Add notes to json file and notes array 
    // const note = createNewNotes(req.body, notes)

    //req.body is where our incoming content will be
    // res.json(req.body);
});

// '/' brings us to the root route of the server! This is the route used to create a homepage for a server.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// Reminder: app.listen should always be last. 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
