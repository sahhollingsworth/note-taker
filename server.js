// Import express module for backend & routing
const express = require("express");
// Import fs module for accessing file system
const fs = require("fs"); 
// Import uuid module for note id generation
const { v4: uuidv4 } = require('uuid');
// Import path module that provides utilities for working with file and directory paths
const path = require("path");
// Import json (acting database) object containing all notes
const noteDB = require("./db/db.json");

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
            // Parse notes data into array
            let parsedNotes = JSON.parse(noteDB);

            // send updated notes data as json object to client
            res.json(parsedNotes)

            // Testing - notes content at each stage
            console.log("Output of getting notes, exact match to source of truth");
            console.log(parsedNotes);
        }
    })
}); 

// Post request to add a note
app.post('/api/notes', (req, res) => {
    // Assign a random id value to the if key
    req.body.id = uuidv4();
    // Set the request body (title, text, id) as the new note to be added
    const newNote = req.body;
    
    // Testing - confirmation of note
    console.log("See the new note")
    console.log(newNote);

    // Pull in notes data from the source of truth
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.error(err)
        }
        else {
            // Parse notes data into array
            let parsedNotes = JSON.parse(data);
            // Add the new note as the last object in the array
            parsedNotes.push(newNote);

            // Testing - notes content at each stage
            console.log("Output of posting a note, all notes including new");
            console.log(parsedNotes);

            // Write the updated notes data back to the source of truth
            fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), (writeError) =>
            writeError
                // Write an error to the web console (and `stderr`)
                ? console.error(writeError)
                // Write an success message to the web console
                : console.info("Added new note successfully!")
            )
            // send updated notes data as json object to client
            res.json(parsedNotes);
        }
    })
});

// Delete request to delete a note
app.delete('/api/notes/:id', (req, res) => {
    // Testing - confirming request received
    console.log('Received Delete request at /notes');

    // retreive the id from the request body 
    const id = req.params.id;

    // Review all note id's in db.json and only include those that don't have the same id as the one being deleted
    updatedNotes = noteDB.filter(note => note.id != id);

    // Testing - notes content at each stage
    console.log("Output of deleting a note, all notes excluded note deleted");
    console.log(updatedNotes);

    // update notes db file with the updated list of notes
    fs.writeFile("./db/db.json", JSON.stringify(updatedNotes),  (deletionError) =>
        deletionError
            // Write an error to the web console (and `stderr`)
            ? console.error(deletionError)
            // Write an success message to the web console
            : console.info("Removed note & updated Notes successfully!")
    );
    // send updated json object to client
    res.json(updatedNotes);
});

// GET '*' returns the `index.html` file
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Listen for incoming connections on the specified port
app.listen(PORT, () => 
    console.log(`App listening on port ${PORT}`)
);