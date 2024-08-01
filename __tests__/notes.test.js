import { jest } from '@jest/globals';

jest.mock('fs');

import { findByID, createNewNotes, validateNote } from '../lib/notes.js';
import data from '../data/notes.json';

// createNewNotes should add to the notes.json file
const notes = data.notes
test('Create a new note object', () => {

    const note = createNewNotes (
        {
            id: "3",
            title: "JEST TEST NOTE TITLE",
            text: "TESTING THE 'createNewNotes' FUNCTIONALITY"
        },
        notes
    );

    expect(note.id).toBe("3");
    expect(note.title).toBe("JEST TEST NOTE TITLE");
    expect(note.text).toBe("TESTING THE 'createNewNotes' FUNCTIONALITY");
});

// Use findByID to locate specific entries saved into the array
test('Locate note by ID', () => {
    const exampleNotes = [
        {
            id: "1",
            title: "Remember to do something",
            text:"But good luck trying to remember, WITHOUT NOTES!"
        },
        {
            id: "2",
            title: "Hello World",
            text:"Hi hi hi!"
        }
    ]

    // Search for ID 2 from our local array, expect title to match
    const result = findByID('2', exampleNotes);
    expect(result.title).toBe('Hello World');
});

// validateNote checks if the title and text is that of a string, or has value.
test('Test the note validation function', () => {
    // Create a valid note object
    const validNote = {
        id: '1',
        title: 'ValidTestTitle',
        text: 'Hello World!'
    }

    // Create a note missing details
    const invalidNote = {
        id: '2',
        title: 'InvalidTestObject'
    }

    // Run the validateNote method to validate results
    const result1 = validateNote(validNote);
    const result2 = validateNote(invalidNote);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
});