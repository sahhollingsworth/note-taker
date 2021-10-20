// Import express module for backend & routing
const express = require("express");
// Import fs module for accessing file system
const fs = require("fs"); 
// Import uniqid module for note id generation
const uniqid = require("uniqid");
// Import path module that provides utilities for working with file and directory paths
const path = require("path");
// Import json (acting database) storing all notes objects
var noteDB = require("./db/db.json");

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

// Get request for notes (from `db.json` file)
app.get('api/notes', (req, res) => {
    res.json(noteDB)
}); 

// Post request to add a note
app.post('/api/notes', (req, res) => {
    // Log that a request was received
    console.info(`${req.method} request received to add a note`);
    
    // Destructure assignment for the newNote in request body
    const { title, text } = req.body;

    // If both required properties are provided, add an id and save the note as a variable
    if (title && text) {
        const newNote = {
            title,
            text,
            // Generate unique id for each note upon creation
            id: uniqid(),
        };
    
    // Retreive all notes
    fs.readFile("./db/db.json", "utf8", (err, noteDB) => {
        if (err) {
            console.error(err);
        }
        else {
            // Convert existining notes into JSON object
            const existingNotes = JSON.parse(noteDB);
            // Add the new note to the existingNotes object
            existingNotes.push(newNote);
            
            // Write updated Notes to the notes db.json file
            // Stringify arguments: null = all properties of the object are included in the resulting JSON string. '\t' adds tab spacing for indentation
            fs.writeFile("./db/db.json", JSON.stringify(existingNotes, null, '\t'), (writeError) =>
                writeError
                    // Write an error to the web console (and `stderr`)
                    ? console.error(writeError)
                    // Write an success message to the web console
                    : console.info("Updated notes successfully!")
            ); 
        }
    });

    // Save new note on the response body
    const response = {
        status: "success",
        body: newNote,
    };

    //for testing response value is correct
    console.log(response);
    // convert the response into a json object, return to client
    res.json(response);
    }
    // if all note properties aren't present, return error message
    else {
        res.json("Error adding note");
    }
});




// Delete request to delet a note
app.delete('/api/notes/:id', (req, res) => {
    // for testing
    console.log('Got a DELETE request at /notes');
    // retrieve the id value
    const id = req.params.id;

    // Filter the existing notes object from db.json for only notes that don't have the same id as the note being deleted. 
    var noteDB = noteDB.filter(note => note.id != id);

    // Write over the existing db.json with the updated set of notes
    fs.writeFile("./db/db.json", JSON.stringify(noteDB));
    
    //return updated notes to client as json object
    res.json(noteDB);
});

// Listen for incoming connections on the specified port
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));