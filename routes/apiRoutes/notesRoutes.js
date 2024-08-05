import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import notes from '../../data/notes.json' assert { type: 'json' };
import { findByID, createNewNotes, validateNote, deleteNote } from '../../lib/notes.js';

// Create the router instance
const router = express.Router();

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findByID(req.params.id, notes);
    res.json(result);
});

// Find the location of the id being deleted
router.delete('/notes/:id', (req, res) => {
    // Access the nested array and tie it to notesArray
    const notesArray = notes.notes

    // Run the parameters through deleteNote method
    const result = deleteNote(req.params.id, notesArray);

    // return the results
    res.json(result);
});

router.post('/notes', (req, res) => {
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

export default router;