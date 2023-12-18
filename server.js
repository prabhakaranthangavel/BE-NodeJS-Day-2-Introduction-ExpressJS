// Convert the ExpressJS
const express = require('express');

// Create the ExpressJS Application
const app = express();

// middleware
app.use(express.json());



const notes = [

    {
        id : 1,
        content : 'JavaScript is a Functionality',
        important : true
    },

    {
        id : 2,
        content : 'CSS is a Styling',
        important : false
    },

    {
        id : 3,
        content : 'React is a both (1) and (2)',
        important : true
    },

]



// Define the application hostname & port number
const HOSTNAME = '127.0.0.1';  // local host IP Address
const PORT     = 4000;         // user defined



// set the end ponits
// set the / route
app.get('/', (request,response) => {
    response.send('Hello World');
})



// endpoint to view all the notes
app.get('/api/notes', (request, response) => {
    response.json(notes);
});



// endpoint to fetch a single note
app.get('/api/notes/:id', (request, response) => {
    // get the id from the params
    const id = request.params.id;

    // find the note with the id in notes data
    const note = notes.find(note => note.id == id);

    if (note) {
        // if such an object with the id exists
        response.status(200).json(note);
    } else {
        response.status(404).json({ message: 'id does not exists' });
    }
});



// endpoint to create a new note based on the request data
app.post('/api/notes', (request, response) => {
    notes = notes.concat(request.body);
    response.status(201).json({ message: 'note created successfully' });
});



// endpoint to delete a note identified by id
app.delete('/api/notes/:id', (request, response) => {
    // get the id from the params
    const id = request.params.id;

    // find the note matching the id
    const note = notes.find(note => note.id == id);

    notes = notes.filter(note => note.id != id);

    if (note) {
        response.status(204).json(note);
    } else {
        response.status(404).json({ message: 'id does not exists' });
    }
});



// endpoint to replace the entire note identified by id with the request data
app.put('/api/notes/:id', (request, response) => {
    // get the id from the params
    const id = request.params.id;

    // get the note to replace from the user - request body
    const noteToReplace = request.body;

    // find the object matching the id
    const note = notes.find(note => note.id == id);

    notes = notes.map(note => note.id == id ? noteToReplace : note);

    if (note) {
        response.status(200).json({ message: 'note replaced' });
    } else {
        response.status(404).json({ message: 'id does not exists' });
    }
});



// endpoint to patch a part of note identified by id with the request data
app.patch('/api/notes/:id', (request, response) => {
    // get the id from the params
    const id = request.params.id;

    // get the note to replace from the user - request body
    const noteToReplace = request.body;

    // find the object matching the id
    const note = notes.find(note => note.id == id);

    notes = notes.map(note => note.id == id ? {...note, ...noteToReplace} : note);

    if (note) {
        response.status(200).json({ message: 'note patched' });
    } else {
        response.status(404).json({ message: 'id does not exists' });
    }
});



// Make the server to listen to the different port number
app.listen(PORT, () => {
    console.log(`Application Running at http://${HOSTNAME}:${PORT}`);
});