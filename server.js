// Import express module for backend & routing
const express = require('express');
// Import fs module for accessing file system
const fs = require("fs"); 
// Import quiqid module for note id generation
var uniqid = require('uniqid');
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
app.use(express.static('public'));


// // HTML routes
// // - `GET *` should return the `index.html` file.
// app.get('/', (req, res) =>
//     res.sendFile(path.join(__dirname, '/public/index.html'))
// );
// // GET Route for homepage
// app.get('/home', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

// // - `GET /notes` should return the `notes.html` file.
// app.get('/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/notes.html'))
// );

// API routes
// - `GET /api/notes` to read the `db.json` file and return all saved notes as JSON.
// - `POST /api/notes` to receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. 
//     - give each note a unique id when it's saved

// Listen for incoming connections on the specified port
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));


// Delete notes
//app.delete('/user', function (req, res) {
//     res.send('Got a DELETE request at /user')
// })