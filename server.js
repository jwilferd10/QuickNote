const fs = require('fs');
const { notes } = require('./data/notes');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express ();

// Middleware that instructs the server to make certain files readily available and to not gate it behind a server endpoint.
// Provide a file path to a location in our application and instruct the server to make these files static resources.
app.use(express.static('public'));

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

app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// Reminder: app.listen should always be last. 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
