const express = require('express');
const { v4: uuidv4 } = require('uuid');

const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())

app.use(express.static('public'));

app.get('/notes', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (request, response) => {
  let database = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8')
  database = JSON.parse(database)
  response.json(database)
});

app.post('/api/notes', (request, response) => {
  let database = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8')
  database = JSON.parse(database)

  const record = {
    id: uuidv4(), ...request.body
  }

  const new_database = [
    ...database,
    record
  ]

  fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(new_database))

  response.json(record)
});

app.listen(PORT, () =>
    console.log(`App listening @ http://localhost:${PORT}`)
);
