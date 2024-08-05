app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findByID(req.params.id, notes);
    res.json(result);
});

// Find the location of the id being deleted
app.delete('/api/notes/:id', (req, res) => {
    // Access the nested array and tie it to notesArray
    const notesArray = notes.notes

    // Run the parameters through deleteNote method
    const result = deleteNote(req.params.id, notesArray);

    // return the results
    res.json(result);
});

app.post('/api/notes', (req, res) => {
    // Access the notes array from the imported notes object 
    const notesArray = notes.notes

    // Set the id to a random uuid
    req.body.id = uuidv4();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        // Add note to the array and JSON file
        const note = createNewNotes(req.body, notesArray);
        //req.body is where our incoming content will be
        res.json(note);
    }
});