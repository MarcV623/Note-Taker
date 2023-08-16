const express = require('express');

const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

app.get('/notes', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (request, response) => {
  let data = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8')
  data = JSON.parse(data)
  response.json(data)
});

app.listen(PORT, () =>
    console.log(`App listening @ http://localhost:${PORT}`)
);
