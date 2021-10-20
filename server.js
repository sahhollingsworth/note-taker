// Import express module for backend & routing
const express = require("express");
// Import fs module for accessing file system
const fs = require("fs"); 
// Import quiqid module for note id generation
var uniqid = require("uniqid");
// Import path module that provides utilities for working with file and directory paths
const path = require("path");
// Import json (acting database) storing all notes objects
var notes = require("./db/db.json");

const app = express();

// PORT is either the value of the environment variable PORT, or, 3001
const PORT = process.env.PORT || 3001;

// Middleware 
// Parse incoming requests with urlencoded payloads and return as objects
app.use(express.urlencoded({ extended: true }));
// Return the incoming request objects as JSON objects
app.use(express.json());
// Serve static files (CSS, JavaScript) in the public directory
app.use(express.static("public"));


// HTML routes
// GET '*' returns the `index.html` file
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET route for the homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET '/notes' return the 'notes.html' file
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// API routes
// - Read `db.json` file and return all saved notes as JSON.
app.get('api/notes', (req, res) => {
    res.json(notes)
});

// - `POST /api/notes` to receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. 
//     - give each note a unique id when it's saved


// Delete notes
// Assumption: users can only delete 1 note at a time
// Pseudo: 
// Each note will have an id. 
// In the UI there is a button on each note element for a user to delete that note.
// When the user hits the button, the id is passed through
// Filtering through all notes, the id is used to find the note object of interest
// The note object is removed from db.json 
// The UI needs to load the new db.json
app.delete('/api/notes/:id', (req, res) => {
    // for testing
    console.log('Got a DELETE request at /notes')
    //return updated contents of db.json as a json object
    res.json(notes);
})

// Listen for incoming connections on the specified port
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));