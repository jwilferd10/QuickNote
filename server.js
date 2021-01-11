const { notes } = require('./data/notes');
const express = require('express');
const app = express ();

// Middleware that instructs the server to make certain files readily available and to not gate it behind a server endpoint.
// Provide a file path to a location in our application and instruct the server to make these files static resources.
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    // res.send('Hello!');
    res.json(notes);
});

app.listen(3001, () => {
    console.log('API server now on port 3001');
});