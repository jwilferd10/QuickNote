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

    try {
        fs.writeFileSync(
            path.join(__dirname, './data/notes.json'),
            JSON.stringify({ notes: notesArray}, null, 2)
        );

        // Notify console that the note has successfully been updated
        console.log(`${note.title} has been ADDED!`);

        // Log the return confirmation
        console.log('notes.json successfully updated');

        // return finished code to post route for response
        return note;
    } catch (error) {
        console.log('Something went wrong with createNewNotes writeFileSync:' + error);
    }
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

// Create a Delete Method
const deleteNote = (id, notesArray) => {
    // Locate the index of the note within it's array
    let locateNoteIndex = notesArray.findIndex(note => note.id === id);

    // console log a return confirmation
    console.log(`${notesArray[locateNoteIndex].title} has been DELETED!`)

    // if findIndex returns true, splice only the one located index from the array
    if (locateNoteIndex !== -1) {
        notesArray.splice(locateNoteIndex, 1);
    }

    try {
        // Save the updated array back to the JSON file
        fs.writeFileSync(
            path.join(__dirname, './data/notes.json'),
            JSON.stringify({ notes: notesArray}, null, 2)
        );

        // console log a return confirmation
        console.log('notes.json successfully updated');
    } catch (error) {
        console.log("Something went wrong with deleteNote's writeFileSync: " + error);
    }
};

// Export the methods
export { findByID, createNewNotes, validateNote, deleteNote };