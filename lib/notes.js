import fs from 'fs';
import path from 'path';
import { __filename, __dirname } from '../utils/pathHelpers.js';

const findByID = (id, notesArray) => {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
}

// Create new notes
const createNewNotes = (body, notesArray) => {
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
const validateNote = (note) => {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

// Export the methods
export { findByID, createNewNotes, validateNote };