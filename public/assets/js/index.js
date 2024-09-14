let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
  noteHeader = document.querySelector('.note-header');
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
  deleteZone = document.querySelector('.delete-zone');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// Fetch the list of notes from the server
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

// Save a new note to the server
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

// Delete a note from the server by it's ID
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

// // Update a note based on it's ID
// const editNote = (id, title, text) => {
//   fetch(`/api/notes/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ title, text }),
//   })
// };


// Parameters returns the title/text, this will display the string content.
const setNoteContent = (title, text) => {
  noteTitle.value = title;
  noteText.value = text;
};

// When invoked, toggles the readonly state based on boolean value
const setReadOnly = (isReadOnly) => {
  if(isReadOnly) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
  }
}

const viewNoteMode = () => {
  setReadOnly(true);
  setNoteContent(activeNote.title, activeNote.text);
  noteHeader.textContent = 'Viewing Note';
};

const createNoteMode = () => {
  setReadOnly(false);
  noteTitle.value = '';
  noteText.value = '';
  noteHeader.textContent = 'Add Note';
};

const editNoteMode = () => {
  setReadOnly(false);
  setNoteContent(activeNote.title, activeNote.text);
  noteHeader.textContent = 'Editing Note';
};

const renderActiveNote = (mode) => {
  hide(saveNoteBtn);

  // Handle the various states with a switch statement
  switch (mode) {
    case 'create':
      console.log('Create Mode');
      createNoteMode();
      break;
    case 'view': 
    console.log('View Mode');
      viewNoteMode();
      break;
    case 'edit':
      console.log('Edit Mode');
      editNoteMode();
      break;
  }
};

// Helper function designed for collecting and returning active note info
const setActiveNote = (e) => {
  const note = e.target.closest('.list-group-item');
  return JSON.parse(note.getAttribute('data-note'));
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote('create');
  });
};

// Delete the clicked note
const handleNoteDelete = (event) => {
  // If the event is triggered by the drag-and-drop the event will be an object with noteId
  const noteId = event.noteId || JSON.parse(event.target.parentElement.getAttribute('data-note')).id;

  // Set activeNote to an empty object, invoke RenderNotes to refresh the list, then reset the form
  deleteNote(noteId).then(() => {
    activeNote = {};
    getAndRenderNotes();
    renderActiveNote('create');
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();

  // Set activeNote to the value collected by setActiveNote
  activeNote = setActiveNote(e);
  renderActiveNote('view');
};

// Create a function that will handle the editing note view
const handleEditNoteView = (e) => {
  // Prevents the listEl's click event from bubbling and voiding this invokation
  e.stopPropagation()

  // Set activeNote to the value collected by setActiveNote
  activeNote = setActiveNote(e);
  renderActiveNote('edit');
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote('create');
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  // Get the JSON data from the response
  let jsonResponse = await notes.json();

  console.log(jsonResponse);

  // Access the array from the object
  let jsonNotes = jsonResponse || [];

  // If on notes page, clear existing note list 
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Function to create a list element for each note
  // text: the NOTE TITLE to display
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    // Set each list element to be draggable
    liEl.setAttribute('draggable', 'true');

    const spanEl = document.createElement('span');
    spanEl.innerText = text;

    // Adding semantic meaning to spanEl
    spanEl.setAttribute('role', 'text');
    spanEl.setAttribute('aria-label', 'Note Title');

    liEl.append(spanEl);

    // Add dragstart event listener to the list item
    liEl.addEventListener('dragstart', (event) => {
      console.log('Dragging started for note:', event.target);
      event.dataTransfer.setData('text/plain', liEl.getAttribute('data-note'));

      // Add active class to delete-zone when dragging begins
      deleteZone.classList.add('active');
    });

    liEl.addEventListener('dragend', () => {
      // Remove the active class when dragging ends
      deleteZone.classList.remove('active');
    })

    const editBtnEl = document.createElement('i');
    editBtnEl.classList.add('fas', 'fa-edit', 'float-right', 'edit-note');
    editBtnEl.addEventListener('click', handleEditNoteView);
    liEl.append(editBtnEl);
  

    // create and append a delete button if true
    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      // append to the list item element
      liEl.append(delBtnEl);
    }

    // return the fully constructed list element
    return liEl;
  };

  // If no notes, create a list item indicating there are no saved notes.
  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  // For each note, create a list item and add it to the noteListItems array
  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    // store the note data in a data attribute
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  // Append each note list item to the DOM when on the notes page
  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
  noteList.forEach((listElement) => {
    listElement.addEventListener('click', handleNoteView);
  });

  deleteZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    console.log('Dragged over the delete zone');
  });

  deleteZone.addEventListener('dragenter', () => {
    deleteZone.classList.add('hovered');
  });

  deleteZone.addEventListener('dragleave', () => {
    deleteZone.classList.remove('hovered');
  });

  deleteZone.addEventListener('drop', (event) => {
    event.preventDefault();

    // Retrieve the note data using dataTransfer
    const noteData = event.dataTransfer.getData('text/plain');

    // Parse the data into note
    const note = JSON.parse(noteData);

    console.log(`${note.title} has been dropped within delete section`);

    // Pass note's note.id directly to handleNoteDelete for deletion
    handleNoteDelete({ noteId: note.id });
  })
};

getAndRenderNotes();
