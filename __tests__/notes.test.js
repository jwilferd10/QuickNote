import { filterByQuery, findByID, createNewNotes, validateNote } from '../lib/notes.js';

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

// 