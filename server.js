const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.json([
    {
      id: 1,
      title: 'My Note!',
      text: 'Hello World!'
    },
    {
      id: 2,
      title: 'My Note',
      text: 'whats up duuude!!!'
    }
  ])
);

app.listen(PORT, () =>
    console.log(`App listening @ http://localhost:${PORT}`)
);
