#  Note Taker Application
The Note Taker application is a simple application for anyone to write and save notes in their web browser, allowing them to organize their thoughts and keep track of tasks they need to complete throughout the day to ensure they can delegate the majority of their time to the actual work they need to be doing.

## Summary
Note Taker is a simple application for writing and saving notes. This application will use an Express.js backend, saving and retrieving note data from a single JSON file.
* App landing page  includes a link to a Notes page which takes the user to a page with all existing notes.
* The Notes page has a left-hand column with the existing notes and a right-hand column with empty fields for the user to enter a new note title and text.
* When the user enters a new note title and text, a Save icon appears in the navigation at the top of the page.
* When the user clicks on the Save icon, the new note is saved and appears in the left-hand column with all other notes.
* When an existing note left-hand column is clicked, the note appears in the right-hand column
THEN that note appears in the right-hand column.
* In the navigation bar at the top of the page there is a new note (write) icon available at all times. If the user selects the new note icon, the right-hand column Note Title and Note Text fields are returned blank for the user to enter a new note.

## Note Taker Application
[Screen recording Demo of Note Taker application available here.](linktovideo)

![Image imageplaceholder](./whatever.filetype)

## Installation
Ensure you have Node.js installed locally to install packages to and from the public npm registry. [Node.js installation documentation.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

This project requires NPMjs and the [Express package](https://www.npmjs.com/package/express). Once you have clone to repo to your local maching, navigate to the root folder in your command line terminal. 

1. Install dependencies `npm install`
Required when when you first set up the project for local development or use OR if any changes are made to the project's dependencies. [More Node information here.](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)

2. Start the server with `npm start`

3. Open the website in your local browser http://localhost:3000

## Usage
Run this application by:
1. Cloning the repository to your local machine.

2. From the root folder of the repository, start the server with `npm start`

3. Open the website in your local browser http://localhost:3000

## Built with
* [UniqueID](https://www.npmjs.com/package/uniqid) - Unique hexatridecimal ID generator, used to create ID's for each note upon creation.
* [Expressjs](https://expressjs.com/) - Node web application framework used for server framework and API management.
* [NPM](https://www.npmjs.com/) - Node package manager, used in conjunction with JS and Inquirer to support application logic and Command Line interface.
* [Node](https://nodejs.org/en/) - Asynchronous event-driven JavaScript runtime environment that executes JavaScript code outside a web browser
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/javascript) - Core app logic
* [Fontawesome](https://fontawesome.com/) - Icons
* [Bootstrap](https://getbootstrap.com/docs/4.0/layout/overview/) - CSS Framework for teampage.html output file generated from application
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - General styling of teampage.html output file generated from application
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - teampage.html output file generated from application
* [Git](https://git-scm.com/doc) - Version control system to track changes to source code
* [GitHub](https://docs.github.com/en) - Hosts the code repository

## Authors
Sarah Hollingsworth
* [Github](https://github.com/sahhollingsworth)
* [LinkedIn](https://www.linkedin.com/in/sarahhollingsworth/)