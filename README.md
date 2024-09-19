# QuickNote
This project is currently undergoing a facelift and will be updated frequently in the coming time. This is a work in progress!

Live Deployment Link: COMING SOON
  
## Screenshots of Deployed Application:
(Coming Soon!)
  
## Table of Contents 
  - [Description](#wave-description)
  - [User Story](#book-user-story)
  - [Resources Used](#floppy_disk-resources-used)
  - [Usage](#minidisc-usage)
  - [Contributors](#paperclip-contributors)

## :wave: Description: 
### ✍️ Welcome to QuickNote
QuickNote is a sleek, user-friendly note-taking application inspired by classic notepads and designed to help users stay organized. Users can effortlessly create, edit, and delete notes, making it perfect for jotting down ideas or reminders.

### 🚀 Features
#### Front-End
- **Semantic HTML:** Built using semantic HTML, following best practices for accessibility and SEO.
- **Efficient CSS:** UI styled with CSS, following modern and efficient design practices.
- **Create Notes:** Quickly and easily create new notes with a clean, intuitive interface.
- **Delete Notes:** Remove notes effortlessly with a single click.
  - **Drag and Drop Deletion:** Optionally delete notes by dragging them into a designated "delete" zone for an interactive experience.
- **Responsive Design:** Optimized for both desktop and mobile devices

#### Back-End
- **Unique ID Generation:** Uses `uuid` to generate unique note IDs for better data management.
- **Automated Testing:** Tests are executed using `jest` to ensure reliable functionality.
- **Express.js Server:** Built with `express.js` for robust server-side functionality.

Simply put, QuickNote is a tool that's ideal for anyone looking to keep track of their thoughts in an organized way.

### 🌐 Accessible and Open
The repository encourages exploration and collaboration, with the codebase thoughtfully organized and easily modifiable. Feel free to delve into the code, contribute, and customize it to your needs.

### 🙏 Thank You!
Thanks for checking out QuickNote, this app has undergone an overhaul and changed drastically since it's creation in 2021. The goal of this project was to go above and beyond a generic note-taking application. Happy coding!

## :book: User Story:
### GIVEN a note-taking application
 - WHEN I open the Note Taker
   - THEN I am presented with a landing page with a link to a notes page
   
 - WHEN I click on the link to the notes page
   - THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
 
 - WHEN I enter a new note title and the note’s text
   - THEN a Save icon appears in the navigation at the top of the page
 
 - WHEN I click on the Save icon
   - THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
 
 - WHEN I click on an existing note in the list in the left-hand column
   - THEN that note appears in the right-hand column
 
 - WHEN I click on the Write icon in the navigation at the top of the page
   - THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

## :floppy_disk: Resources Used:
- express.js (^4.19.2)
- jest (^29.7.0)
- uuid (^10.0.0)
- fontawesome (^5.3.1)
- bootstrap (4.1.3)

## :minidisc: Usage:
  - The `Note Header` will change based on current actions
    - Users will see a visual notification on the header based on adding/viewing a note
  - To create a note, click on the `pencil` emoji. The header will indicate when you can add a note.
  - When your note is capable of saving a `save emoji` (floppy-disk icon) will appear, clicking that will save your note
    - Saved notes will feature the note-title as it's list title.
  - Clicking a saved note will showcase the title and text.
  - Clicking the trash-can will delete an existing note
  
## :paperclip: Contributors
  - Github: [jwilferd10](https://github.com/jwilferd10)
  - Email: jwilferd10@yahoo.com 
