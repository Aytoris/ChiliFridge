const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

app.get('/app.js', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'app.js');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(data);
    }
  });
});

app.get('/fridge', (req, res) => {
  const filePath = path.join(__dirname, 'fridge.json');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    }
  });
});

app.get('/recipes', (req, res) => {
  const filePath = path.join(__dirname, 'recipes.json');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    }
  });
});

app.post('/write-json', (req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString(); // Collect the data sent by the client
  });

  req.on('end', () => {
    const fridgeData = JSON.parse(body); // Parse the received JSON data
    console.log('Received data:', fridgeData);

    const jsonFilePath = path.join(__dirname, 'fridge.json');

    // Read the existing JSON data from the file
    fs.readFile(jsonFilePath, 'utf8', (readErr, jsonData) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading file');
      } else {
        try {
          const updatedData = fridgeData;

          // Write the updated JSON data back to the file
          const updatedJsonData = JSON.stringify(updatedData, null, 2);
          fs.writeFile(jsonFilePath, updatedJsonData, 'utf8', writeErr => {
            if (writeErr) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Error writing file');
            } else {
              res.writeHead(200, { 'Content-Type': 'text/plain' });
              res.end('JSON file updated successfully');
            }
          });
        } catch (parseError) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error parsing JSON');
        }
      }
    });
  });
});

const PORT = 3000; // Set your desired port number
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});