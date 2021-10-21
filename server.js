// Import express module for backend & routing
const express = require("express");
// Import fs module for accessing file system
const fs = require("fs"); 
// Import uuid module for note id generation
const { v4: uuidv4 } = require('uuid');
// Import path module that provides utilities for working with file and directory paths
const path = require("path");
// Import json (acting database) object containing all notes
var noteDB = require("./db/db.json");

console.log(noteDB);
console.log(typeof noteDB);

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

// GET route for the homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET '/notes' return the 'notes.html' file
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Get request for notes (from `db.json` file)
app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", (err, noteDB) => {
        if (err) {
            console.error(err)
        }
        else {
            let parsedNotes = JSON.parse(noteDB);
            res.json(parsedNotes)
        }
    })
}); 

// Post request to add a note
app.post('/api/notes', (req, res) => {
    // Assign a random id value to the if key
    req.body.id = uuidv4();
    // Set the request body (title, text, id) as the new note to be added
    const newNote = req.body;
    // See the newnote contents
    console.log(newNote);
    
    //Add new note to notes database
    noteDB.push(newNote);
    
    // Write updated Notes to the notes db.json file
    fs.writeFile("./db/db.json", JSON.stringify(noteDB), (writeError) =>
        writeError
            // Write an error to the web console (and `stderr`)
            ? console.error(writeError)
            // Write an success message to the web console
            : console.info("Added new note successfully!")
    )
    // send updated json object to client
    res.json(noteDB);
});

// Delete request to delete a note
app.delete('/api/notes/:id', (req, res) => {
    // for testing
    console.log('Got a DELETE request at /notes');

    fs.readFile("./db/db.json", "utf8", (err, noteDB) => {
        if (err) {
            console.error(err)
        }
        else {
            // convert data to array
            let parsedNotes = JSON.parse(noteDB);

            console.log("req.params.id");
            console.log(req.params.id);

            // retrieve the id value
            const id = req.params.id;

            // Filter the existing notes object from db.json for only notes that don't have the same id as the note being deleted. 
            parsedNotes = parsedNotes.filter(note => note.id != id);
            console.log("What parsed notes looks like after note in question is removed");
            console.log(parsedNotes);

            // Write over the existing db.json with the updated set of notes
            fs.writeFile("./db/db.json", JSON.stringify(parsedNotes),  (deletionError) =>
                deletionError
                    // Write an error to the web console (and `stderr`)
                    ? console.error(deletionError)
                    // Write an success message to the web console
                    : console.info("Removed note & updated Notes successfully!")
            );
            //return updated notes to client as json object
            // console.log(parsedNotes);
            // console.log(JSON.stringify(parsedNotes));
            res.json(parsedNotes);
        }
    })
});

// GET '*' returns the `index.html` file
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Listen for incoming connections on the specified port
app.listen(PORT, () => 
    console.log(`App listening on port ${PORT}`)
);